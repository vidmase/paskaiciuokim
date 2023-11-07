import React from 'react';
import { CurrencyInput, NumberInput, PercentageInput } from './input';
import { BuyToLetInput, buyToLetCalculator } from './calculator';
import { BuyToLetResultView } from './result';
import { BUY_TO_LET_INPUT } from './properties';

const FeeView = ({ inputState, onChange }: any) => {
  return <div className='w-full grid grid-flow-row space-y-8'>
    <CurrencyInput
        value={inputState.mortgageFees}
        property="mortgageFees"
        label={BUY_TO_LET_INPUT.mortgageFees.label}
        description={BUY_TO_LET_INPUT.mortgageFees.description}
        max={10000}
        min={0}
        step='10'
        onChange={onChange}
    />

    <CurrencyInput
        value={inputState.solicitorFees}
        property="solicitorFees"
        label={BUY_TO_LET_INPUT.solicitorFees.label}
        description={BUY_TO_LET_INPUT.solicitorFees.description}
        max={10000}
        step='10'
        onChange={onChange}
    />

    <CurrencyInput
        value={inputState.annualMaintenance}
        property="annualMaintenance"
        label={BUY_TO_LET_INPUT.annualMaintenance.label}
        description={BUY_TO_LET_INPUT.annualMaintenance.description}
        max={5000}
        step='10'
        onChange={onChange}
    />

    <CurrencyInput
        value={inputState.annualServiceCharge}
        property="annualServiceCharge"
        label={BUY_TO_LET_INPUT.annualServiceCharge.label}
        description={BUY_TO_LET_INPUT.annualServiceCharge.description}
        max={10000}
        step='10'
        onChange={onChange}
    />

    <CurrencyInput
        value={inputState.groundRent}
        property="groundRent"
        label={BUY_TO_LET_INPUT.groundRent.label}
        description={BUY_TO_LET_INPUT.groundRent.description}
        max={1000}
        step='5'
        onChange={onChange}
    />

  </div>
}

const App = () => {

  const defaultState: BuyToLetInput = {
    propertyValue: 250000,
    interestRate: 5.5,
    mortgageFees: 500,
    mortgageYears: 25,
    monthlyRent: 1300,
    other: 0,
    vacantMonths: 0,
    managementFees: 0,
    loanToValue: 75,
    solicitorFees: 100,
    annualMaintenance: 100,
    annualServiceCharge: 100,
    groundRent: 10,
  }

  const [inputState, setState] = React.useState(defaultState);
  const [interestOnly, setInterestOnly] = React.useState(true);
  const [view, setView] = React.useState('capital');

  const onChange = ({ property, value }: any) => {
    setState({ ...inputState, [property]: value });
  }

  const result = buyToLetCalculator(Object.assign({}, inputState, { interestOnly }))

  let isLoss;
  return <div className='hero min-h-screen bg-base-200 text-xl'>
    <div className='hero-content w-full flex-col max-w-3xl'>

      <div className='max-w-xl grid grid-flow-row space-y-4 my-8'>
        <h1 className="text-5xl text-slate-600 font-semibold text-left">Pelningumo skaičiuoklė</h1>


        <p style={{
          textAlign: 'right',
          // Add your font family here
          fontFamily: '"Roboto", sans-serif', // Replace 'Your Font Family' with the font you want to use
          // Adjust the margins as required
          marginTop: '3px',
          marginRight: '61px',
          marginBottom: '35px',
          marginLeft: '50px'

        }}>
          <small style={{

            color: 'darkgray'}}>Rent, Relax, Repeat
          </small>


          <span uk-icon="home" style={{
            color: 'red',
            fontSize: '30px',
            textAlign: 'right',
            margin: '4px',
            padding: '5px',
            backgroundColor: '#F4CE14',
            borderRadius: '20%', // Makes the background circle if the icon is square sized
            display: 'inline-flex', // Required for some properties like padding to work properly
            transform: 'rotate(0deg)',
            transition: 'transform 0.3s ease' // Smoothly rotate the icon on hover

          }}></span>


        </p>


        <p style={{
          textAlign: 'left',
          // Add your font family here
          fontFamily: '"Roboto", sans-serif', // Replace 'Your Font Family' with the font you want to use
          // Adjust the margins as required
          marginTop: '0px',
          marginRight: '32px',
          marginBottom: '0px',
          marginLeft: '21px'
        }}>
          <p className="text-1xl text-slate-600 uk-align-right@s -ms-5 font-thin font-semibold text-left">
          <small style={{ color: 'darkgray' }}>Tai paprastas skaičiuotuvas, padėsiantis įvertinti nekilnojamojo turto pirkimo ir nuomos pelningumą</small>
        </p>

          <small></small>


        </p>


      </div>

      <div className='flex flex-col lg:flex-row-reverse'>
        <div className="card flex-1 shadow-2xl bg-base-100 rounded-none w-full">
          <div className='card-body'>
            <BuyToLetResultView input={inputState} result={result} />
          </div>
        </div>

        <div className="card flex-1 shadow-2xl bg-base-100 rounded-none w-full">
          <div className='card-body'>
            <div className="tabs tabs-bordered">
              <a className={`tab tab-bordered text-xl ${view === 'capital' ? 'tab-active' : ''}`} onClick={() => setView('capital')}>Turtas</a>
              <a className={`tab tab-bordered text-xl ${view === 'fees' ? 'tab-active' : ''}`} onClick={() => setView('fees')}>Mokesčiai</a>
              <div className='pt-8 w-full'>
                {view === 'capital' && <CapitalView inputState={inputState} onChange={onChange} onInterestChange={setInterestOnly} interestOnly isLoss={result.annualProfit < 0} />}
                {view === 'fees' && <FeeView inputState={inputState} onChange={onChange} />}



              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default App;

const CapitalView = ({ inputState, onChange, onInterestChange, interestOnly, isLoss }: any) => {
  return <div className='w-full grid grid-flow-row space-y-8'>
    <CurrencyInput
      value={inputState.propertyValue}
      property="propertyValue"
      label={BUY_TO_LET_INPUT.propertyValue.label}
      description={BUY_TO_LET_INPUT.propertyValue.description}
      max={1000000}
      min={50000}
      step='1000'
      onChange={onChange}
      useDanger={isLoss}
    />

    <PercentageInput
      value={inputState.loanToValue}
      property="loanToValue"
      label={BUY_TO_LET_INPUT.loanToValue.label}
      description={BUY_TO_LET_INPUT.loanToValue.description}
      max={100}
      min={0}
      step='0.5'
      onChange={onChange}
      useDanger={isLoss}
    />

    <CurrencyInput
      value={inputState.monthlyRent}
      property="monthlyRent"
      label={BUY_TO_LET_INPUT.monthlyRent.label}
      description={BUY_TO_LET_INPUT.monthlyRent.description}
      max={10000}
      step='100'
      onChange={onChange}
      useDanger={isLoss}
    />

    <NumberInput
      value={inputState.vacantMonths}
      property="vacantMonths"
      label={BUY_TO_LET_INPUT.vacantMonths.label}
      description={BUY_TO_LET_INPUT.vacantMonths.description}
      max={12}
      min={0}
      step='1'
      onChange={onChange}
      useDanger={isLoss}
    />
    <PercentageInput
        value={inputState.interestRate}
        property="interestRate"
        label={BUY_TO_LET_INPUT.interestRate.label} // Assuming you have a label defined in your BUY_TO_LET_INPUT
        description={BUY_TO_LET_INPUT.interestRate.description} // Same as above for description
        max={10} // You might want to set a realistic max value
        min={0}
        step='0.1'
        onChange={onChange}
        useDanger={isLoss}
    />

    <div className='flex align-middle space-x-5' >
      <input defaultChecked={interestOnly} type='checkbox' className='checkbox' onChange={(e) => onInterestChange(e.target.checked)} />
      <span>Tik palūkanos</span>
    </div>
  </div>
}


