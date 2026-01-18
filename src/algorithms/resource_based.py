def resource_based(df):
    df["resource_score"] = (
        df["cpu_usage_percent"] +
        df["memory_usage_percent"]
    )
    best = df.loc[df["resource_score"].idxmin()]
    return best["server_id"]
