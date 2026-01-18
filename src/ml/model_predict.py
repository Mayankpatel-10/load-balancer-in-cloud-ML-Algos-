def predict_response(model, row):
    prediction = model.predict([[
        row["active_connections"],
        row["cpu_usage_percent"],
        row["memory_usage_percent"],
        row["network_latency_ms"]
    ]])
    return prediction[0]
