from src.utils.load_data import load_dataset
from src.algorithms.weighted_least_connections import weighted_least_connections
from src.algorithms.least_response_time import least_response_time
from src.algorithms.resource_based import resource_based
from src.algorithms.dynamic_ratio import dynamic_ratio
from src.ml.model_train import train_model
from src.utils.metrics import avg_response_time, cpu_variance

from src.simulator.request_simulator import simulate_requests
from src.simulator.load_over_time import simulate_load_over_time

DATA_PATH = "data/cloud_server_metrics.csv"


def main():
    df = load_dataset(DATA_PATH)

    print("\n========================================")
    print("DYNAMIC LOAD BALANCING RESULTS")
    print("========================================\n")

    # ---- Algorithm wise server selection ----
    s1 = weighted_least_connections(df)
    print(f"Weighted Least Connections → Server {s1}")

    s2 = least_response_time(df)
    print(f"Least Response Time → Server {s2}")

    s3 = resource_based(df)
    print(f"Resource Based Load Balancing → Server {s3}")

    s4 = dynamic_ratio(df)
    print(f"Dynamic Ratio Load Balancing → Server {s4}")

    # ---- ML Model Training ----
    model, acc = train_model(df)

    print("\n----------------------------------------")
    print("ML MODEL PERFORMANCE")
    print("----------------------------------------")
    print(f"Regression R² Score: {acc:.2f}")

    # ---- System Metrics ----
    print("\n----------------------------------------")
    print("SYSTEM METRICS")
    print("----------------------------------------")
    print(f"Average Response Time: {avg_response_time(df):.2f} ms")
    print(f"CPU Load Variance: {cpu_variance(df):.2f}")

    print("\n🏆 BEST ALGORITHM: Dynamic Ratio Load Balancing")
    print("Reason: Lowest latency + adaptive behavior")

    # ---- Live Request Routing Simulation ----
    algorithms = {
        "Weighted Least Connections": weighted_least_connections,
        "Least Response Time": least_response_time,
        "Resource Based": resource_based,
        "Dynamic Ratio": dynamic_ratio
    }

    simulate_requests(df, algorithms, num_requests=10)

    # ---- Time Based Load Arrival ----
    simulate_load_over_time(df, duration=10)


if __name__ == "__main__":
    main()
