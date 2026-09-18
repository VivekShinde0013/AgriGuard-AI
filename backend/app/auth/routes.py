from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from psycopg.errors import UniqueViolation

from backend.app.db.database import get_connection
from backend.app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)


router = APIRouter(prefix="/auth", tags=["auth"])


# -------------------------
# Request Models
# -------------------------

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str


class LoginRequest(BaseModel):
    email: str
    password: str


# -------------------------
# Health Check
# -------------------------

@router.get("/health")
def auth_health():
    return {
        "status": "ok",
        "service": "auth"
    }


# -------------------------
# Register
# -------------------------

@router.post("/register")
def register_user(data: RegisterRequest):

    role = data.role.lower().strip()
    email = data.email.lower().strip()

    if role not in ["farmer", "officer"]:
        raise HTTPException(
            status_code=400,
            detail="Role must be farmer or officer"
        )

    if len(data.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )

    password_hash = hash_password(data.password)

    try:
        with get_connection() as conn:
            with conn.cursor() as cur:

                # Insert user
                cur.execute(
                    """
                    INSERT INTO users (name, email, password_hash, role)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    (
                        data.name.strip(),
                        email,
                        password_hash,
                        role
                    )
                )

                user_id = cur.fetchone()[0]

                # Create role-specific record
                if role == "farmer":
                    cur.execute(
                        """
                        INSERT INTO farmers (user_id)
                        VALUES (%s)
                        """,
                        (user_id,)
                    )

                else:
                    cur.execute(
                        """
                        INSERT INTO officers (user_id)
                        VALUES (%s)
                        """,
                        (user_id,)
                    )

        return {
            "message": "User registered successfully",
            "user_id": user_id,
            "role": role
        }

    except UniqueViolation:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )


# -------------------------
# Login
# -------------------------

@router.post("/login")
def login_user(data: LoginRequest):

    email = data.email.lower().strip()

    with get_connection() as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                SELECT id, name, email, password_hash, role
                FROM users
                WHERE email = %s
                """,
                (email,)
            )

            user = cur.fetchone()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    user_id, name, db_email, password_hash, role = user

    if not verify_password(data.password, password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        user_id,
        role
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": name,
            "email": db_email,
            "role": role
        }
    }


# -------------------------
# Current User
# Protected Route
# -------------------------

@router.get("/me")
def get_me(
    current_user: dict = Depends(get_current_user)
):
    return {
        "message": "Authenticated user",
        "user_id": current_user["sub"],
        "role": current_user["role"]
    }