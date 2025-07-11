export default function UserInput({onChange, investmentData}) {
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initial-investment">Initial Investment</label>
                    <input type="number" id="initial-investment"
                        value={investmentData.initialInvestment}
                        required onChange={(e) => onChange("initialInvestment", e.target.value)}/>
                </p>
                <p>
                    <label htmlFor="annual-investment">Annual Investment</label>
                    <input type="number" id="annual-investment"
                        value={investmentData.annualInvestment}
                        required onChange={(e) => onChange("annualInvestment", e.target.value)}/>
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">Expected Return</label>
                    <input type="number" id="expected-return"
                        value={investmentData.expectedReturn}
                        required onChange={(e) => onChange("expectedReturn", e.target.value)}/>
                </p>
                <p>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" id="duration"
                        value={investmentData.duration}
                        required onChange={(e) => onChange("duration", e.target.value)}/>
                </p>
            </div>
        </section>
    )
}