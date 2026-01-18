import numpy as np

def avg_response_time(df):
    return np.mean(df["response_time_ms"])

def cpu_variance(df):
    return np.var(df["cpu_usage_percent"])
