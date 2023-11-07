import React from "react";
import { BuyToLetInput, BuyToLetResult } from "./calculator";

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

export const BuyToLetResultSummary = ({ result }: any) => {

    const totalTextClass = result.annualProfit > 0 ? 'text-green-700' : 'text-red-700';

    return (
        <div>
            <table className="table text-base-content w-full text-xl">
                <tbody>
                    <tr>
                        <td>Pradinis kapitalas</td>
                        <td className='font-black'>{currencyFormatter.format(result.capital.total ?? 0)}</td>
                    </tr>
                    <tr>
                        <td>Metinės pajamos<small><h6>(prieš mokesčius)</h6></small></td>
                        <td>{currencyFormatter.format(result.rentalIncome)}</td>
                    </tr>
                    <tr>
                        <td>Metinės išlaidos + mokesčiai</td>
                        <td>{currencyFormatter.format(result.annualCost)}</td>

                    </tr>
                    <tr>
                        <td>Metinis pelnas <small><h6>(prieš mokesčius)</h6></small></td>
                        <td className={`${totalTextClass} font-bold`}>{currencyFormatter.format(result.annualProfit ?? 0)}</td>
                        <span uk-icon="happy" style={{
                            color: 'red',
                            fontSize: '36px',
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: '#F4CE14',
                            borderRadius: '100%', // Makes the background circle if the icon is square sized
                            display: 'inline-grid', // Required for some properties like padding to work properly
                            transform: 'rotate(20deg)',
                            transition: 'transform 0.3s ease' // Smoothly rotate the icon on hover
                        }}></span>
                    </tr>
                    <tr>
                        <td>Metinis pajamingumas</td>
                        <td className={`${totalTextClass} font-bold`}>{result.annualProfitPercentage.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const BuyToLetResultDetailed = ({ result, input }: { result: BuyToLetResult, input: BuyToLetInput }) => {

    const totalTextClass = result.annualProfit > 0 ? 'text-green-700' : 'text-red-700';
    return <div className="grid grid-flow-row space-y-8">
        <table className="table text-base-content w-full text-xl">
            <caption>Pradinis kapitalas</caption>
            <tbody>
                <tr>
                    <td>Depozitas</td>
                    <td>{currencyFormatter.format(result.capital.deposit)}</td>
                </tr>
                <tr>
                    <td>Žyminis mokestis (<small>Stamp Duty 3%)</small></td>
                    <td>{currencyFormatter.format(result.capital.stampDuty)}</td>
                </tr>
                <tr>
                    <td>Advokato mokesčiai</td>
                    <td>{currencyFormatter.format(result.capital.solicitorFees)}</td>
                </tr>
                <tr>
                    <td>Paskolos mokesčiai</td>
                    <td>{currencyFormatter.format(result.capital.mortgageFees)}</td>
                </tr>
                <tr className="font-black">
                    <td>Iš viso:</td>
                    <td>{currencyFormatter.format(result.capital.total)}</td>
                </tr>
            </tbody>
        </table>
        <table>


            <tbody>
            <caption style={{ marginTop: '-10px' }}>Kasmetinės</caption>

            <tr>
                    <td style={{ paddingTop: '10px' }}>Pajamos</td>
                    <td>{currencyFormatter.format(result.rentalIncome)}</td>
                </tr>

            <tr>
                    <td>Paskolos įmoka</td>
                    <td>{currencyFormatter.format(result.monthlyMortgagePayment * 12)}</td>
                </tr>
                {input.managementFees > 0 && <tr>
                    <td>Management Fees</td>
                    <td>{currencyFormatter.format(input.managementFees)}</td>
                </tr>}
                <tr>
                    <td>Paslaugų mokestis</td>
                    <td>{currencyFormatter.format(input.annualServiceCharge)}</td>
                </tr>
                {input.groundRent > 0 && <tr>
                    <td>Žemės nuoma</td>
                    <td>{currencyFormatter.format(input.groundRent)}</td>
                </tr>}
                <tr>
                    <td>Priežiūra</td>
                    <td>{currencyFormatter.format(input.annualMaintenance)}</td>
                </tr>
                {input.other > 0 && <tr>
                    <td>Kita</td>
                    <td>{currencyFormatter.format(input.other)}</td>
                </tr>}
                <tr>

                    <td>Kasmetinės pajamos </td>

                    <td className={`${totalTextClass} font-extrabold`}>{currencyFormatter.format(result.annualProfit ?? 0)}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export const BuyToLetResultView = ({ result, input }: { result: BuyToLetResult, input: BuyToLetInput }) => {
    const [view, setView] = React.useState('summary');

    return <div className="-tracking-wide ">
        <div className="flex justify-between">
            <button className={`btn btn-sm ${view === 'summary' ? 'btn-primary' : 'btn-neutral'}`} onClick={() => setView('summary')}>Santrauka</button>
            <button className={`btn btn-sm ${view === 'detailed' ? 'btn-primary' : 'btn-neutral'}`} onClick={() => setView('detailed')}>Detaliai</button>
        </div>
        {view === 'summary' && <BuyToLetResultSummary result={result} />}
        {view === 'detailed' && <BuyToLetResultDetailed input={input} result={result} />}
    </div>
}
