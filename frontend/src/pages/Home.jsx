function Home() {
    const information = [
        {
            id: 1,
            income: "1000",
            expense: "100",
            balance: "300",
            lastUpdated: "2025-08-11",
            currency: "USD"
        }
    ];

    return (
        <div className="Home">
            <div className = "whole-information">
                {information.map()}
            </div>

        </div>
    )
}