def dynamic_ratio(df):
    df["dynamic_weight"] = (
        df["server_capacity_weight"] *
        (1 - df["cpu_usage_percent"] / 100)
    )

    df["score"] = df["active_connections"] / df["dynamic_weight"]
    best = df.loc[df["score"].idxmin()]
    return best["server_id"]
