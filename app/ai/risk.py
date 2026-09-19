def assess_risk(prediction: dict, weather: dict) -> dict:
    disease = prediction.get("disease", "")
    temperature = weather.get("temperature")
    humidity = weather.get("humidity")
    rainfall = weather.get("rainfall")

    risk_factors = []

    if temperature is None or humidity is None:
        return {
            "disease": disease,
            "risk_level": "insufficient_data",
            "risk_factors": ["Temperature or humidity data is unavailable"],
            "basis": "University of Minnesota Extension",
        }

    if disease == "Tomato___Early_blight":
        if 15 <= temperature <= 30:
            risk_factors.append(
                "Temperature is within the documented favorable range"
            )
        if humidity >= 90:
            risk_factors.append(
                "High relative humidity may favor disease development"
            )
        if risk_factors:
            risk_level = "favorable_conditions"
        else:
            risk_level = "conditions_less_favorable"

    elif disease == "Tomato___Late_blight":
        if 15.6 <= temperature <= 21.1:
            risk_factors.append(
                "Temperature is within the documented favorable range"
            )
        if humidity >= 90:
            risk_factors.append(
                "High humidity may favor disease development"
            )
        if risk_factors:
            risk_level = "favorable_conditions"
        else:
            risk_level = "conditions_less_favorable"

    elif disease == "Tomato___Leaf_Mold":
        if 21.7 <= temperature <= 23.9:
            risk_factors.append(
                "Temperature is within the documented optimal range"
            )
        if humidity >= 85:
            risk_factors.append(
                "High relative humidity favors severe disease development"
            )
        if risk_factors:
            risk_level = "favorable_conditions"
        else:
            risk_level = "conditions_less_favorable"

    elif disease == "Tomato___Septoria_leaf_spot":
        if 20 <= temperature <= 25:
            risk_factors.append(
                "Temperature is within the documented favorable range"
            )
        if humidity >= 90:
            risk_factors.append(
                "High humidity may favor disease development"
            )
        if risk_factors:
            risk_level = "favorable_conditions"
        else:
            risk_level = "conditions_less_favorable"

    elif disease == "Tomato___Bacterial_spot":
        temperature_favorable = False
        humidity_favorable = False
        rainfall_favorable = False

        if 23.9 <= temperature <= 30:
            temperature_favorable = True
            risk_factors.append(
                "Temperature is within the documented preferred range"
            )

        if humidity >= 90:
            humidity_favorable = True
            risk_factors.append(
                "High humidity may favor disease development"
            )

        if rainfall is not None and rainfall > 0:
            rainfall_favorable = True
            risk_factors.append(
                "Rainfall may favor bacterial spot development"
            )

        if temperature_favorable and humidity_favorable and rainfall_favorable:
            risk_level = "favorable_conditions"
        elif temperature_favorable:
            risk_level = "partially_favorable"
        else:
            risk_level = "conditions_less_favorable"

    else:
        return {
            "disease": disease,
            "risk_level": "not_supported",
            "risk_factors": [
                "No documented environmental rule is configured for this disease"
            ],
            "basis": "University of Minnesota Extension",
        }

    if rainfall is None:
        risk_factors.append("Rainfall data unavailable; rainfall not evaluated")

    return {
        "disease": disease,
        "risk_level": risk_level,
        "risk_factors": risk_factors,
        "basis": "University of Minnesota Extension",
    }