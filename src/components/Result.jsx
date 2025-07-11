import { calculateInvestmentResults } from "../util/investment"
import { formatter } from "../util/investment"

export default function Result({investmentData}) {
    const investmentResults = calculateInvestmentResults(investmentData)
    const initialInvestment = 
        investmentResults[0].valueEndOfYear - investmentResults[0].interest - investmentResults[0].annualInvestment
    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Invesment Value</th>
                    <th>Interest  (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {investmentResults.map((result) => {
                    const totalInterest = result.valueEndOfYear - result.annualInvestment*result.year - initialInvestment
                    const totalAmountInvested = result.valueEndOfYear - totalInterest

                    return (
                        <tr key={result.year}>
                        <td>{result.year}</td>
                        <td>{formatter.format(result.valueEndOfYear)}</td>
                        <td>{formatter.format(result.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(totalAmountInvested)}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}