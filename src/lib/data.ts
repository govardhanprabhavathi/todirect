export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  summary: string;
  keyTakeaway: string;
  formula?: string;
  workedExample?: {
    scenario: string;
    calculation: string;
    insight: string;
  };
  content: string[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    misconception?: string;
    explanation: string;
  }[];
}

export interface ModuleData {
  id: string;
  order: number;
  title: string;
  tagline: string;
  duration: string;
  level: string;
  overview: string;
  learningOutcomes: string[];
  lessons: Lesson[];
  questions: QuizQuestion[];
}

export const CURRICULUM_DATA: ModuleData[] = [
  {
    id: 'money-foundations',
    order: 1,
    title: 'Money Foundations',
    tagline: 'Cashflow fundamentals, budgeting, and emergency liquidity',
    duration: '25 mins',
    level: 'Beginner',
    overview: 'Before investing a single rupee, understand the flow of money. Learn how to allocate income, avoid debt traps, and build an untouchable emergency cushion.',
    learningOutcomes: [
      'Apply the 50/30/20 budget framework flexibly across stipend or salary levels',
      'Distinguish between productive assets, depreciating items, and recurring liabilities',
      'Calculate an exact 3-6 month emergency liquidity requirement',
      'Identify high-cost debt traps like revolving credit card APRs'
    ],
    lessons: [
      {
        id: 'mf-1',
        moduleId: 'money-foundations',
        title: 'Cashflow vs Wealth: The Core Distinction',
        duration: '6 mins',
        summary: 'Income is how much flows in; wealth is what stays and works for you.',
        keyTakeaway: 'High income with high spending creates zero long-term security. Wealth is accumulated through consistent positive cashflow retention.',
        content: [
          'Most people equate a high salary or large pocket money with being rich. In reality, income is merely raw fuel. If your outflows equal or exceed your inflows, you are one unexpected emergency away from financial crisis.',
          'Wealth is measured in time: how many months or years could you sustain your living standards if your primary income source stopped today?',
          'The goal of this foundational stage is establishing an automated delta between earnings and expenditures, allowing capital to accumulate before entering investment markets.'
        ]
      },
      {
        id: 'mf-2',
        moduleId: 'money-foundations',
        title: 'The 50/30/20 Rule in the Real World',
        duration: '7 mins',
        summary: 'A simple, adaptable framework for dividing needs, wants, and savings.',
        keyTakeaway: '50% essentials, 30% discretionary wants, 20% minimum savings. Adjust to 60/20/20 in high-rent urban centers, but never sacrifice the 20% savings habit.',
        formula: 'Net Income = 50% Needs + 30% Wants + 20% Financial Freedom',
        workedExample: {
          scenario: 'A college graduate receives ₹35,000 monthly take-home salary in Pune.',
          calculation: 'Needs (Rent, groceries, commute) = ₹17,500. Wants (Dining, subscriptions, hobbies) = ₹10,500. Savings/Buffer = ₹7,000.',
          insight: 'Automating the ₹7,000 transfer on payday guarantees 20% savings habit before lifestyle inflation takes over.'
        },
        content: [
          'Budgeting is not about deprivation; it is intentional spending without regret. When you assign every rupee a role before the month begins, discretionary spending feels guilt-free.',
          'Needs include non-negotiable living expenses: rent, food, medical essentials, and basic transit. Wants cover lifestyle upgrades, dining out, and entertainment.',
          'The 20% allocation goes directly into emergency buffer creation, debt reduction, and systematic learning investments.'
        ]
      },
      {
        id: 'mf-3',
        moduleId: 'money-foundations',
        title: 'Building an Untouchable Emergency Buffer',
        duration: '6 mins',
        summary: 'Protecting your future investments from forced premature liquidation.',
        keyTakeaway: 'Never invest money you will need in the next 12 months. An emergency fund must reside in liquid, capital-safe instruments.',
        content: [
          'Without an emergency fund, unexpected events like medical emergencies, laptop repairs, or job transitions force you to liquidate investments at market bottoms or take high-interest loans.',
          'A proper buffer covers 3 to 6 months of mandatory living expenses. Keep it in a high-yield savings account or overnight liquid debt mutual fund—never in speculative equities.'
        ]
      },
      {
        id: 'mf-4',
        moduleId: 'money-foundations',
        title: 'Toxic Debt vs Productive Leverage',
        duration: '6 mins',
        summary: 'Understanding interest rates and how compounding works against you in debt.',
        keyTakeaway: 'Credit card rollover charges (36-42% APR) destroy wealth faster than any investment can build it.',
        content: [
          'When you borrow at 3% per month, compounding works furiously against you. A ₹20,000 credit card balance can easily double if only minimum payments are made.',
          'Always clear toxic consumer debt before attempting to invest in equity markets.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-mf-1',
        moduleId: 'money-foundations',
        scenario: 'Priya earns ₹40,000/month. She wants to start investing in high-growth equity funds immediately, but has only ₹3,000 in savings and ₹22,000 in monthly basic living expenses. What is the most financially sound first step?',
        options: [
          {
            id: 'a',
            text: 'Invest ₹10,000 into small-cap equities to double her savings quickly.',
            isCorrect: false,
            misconception: 'Speculative Shortcut Bias',
            explanation: 'Small-cap funds carry high short-term volatility. If a personal emergency strikes during a market correction, Priya would be forced to sell at a severe loss.'
          },
          {
            id: 'b',
            text: 'Build a liquid emergency fund covering at least 3 months of basic expenses (approx ₹66,000) before investing in volatile markets.',
            isCorrect: true,
            explanation: 'Correct! An emergency fund prevents forced distress liquidation of long-term investments.'
          },
          {
            id: 'c',
            text: 'Use credit card cash advances to fund high-dividend stocks.',
            isCorrect: false,
            misconception: 'Toxic Leverage Fallacy',
            explanation: 'Credit card interest rates run at 36-42% APR, completely destroying any prospective dividend return.'
          }
        ]
      }
    ]
  },
  {
    id: 'saving-compounding',
    order: 2,
    title: 'Saving & Compounding',
    tagline: 'The exponential mathematics of time, APY, and the Rule of 72',
    duration: '30 mins',
    level: 'Beginner',
    overview: 'Compounding is the engine of long-term wealth. Discover why starting at 20 beats starting at 30, and how compound frequency accelerates growth.',
    learningOutcomes: [
      'Understand the exponential formula: A = P(1 + r/n)^(nt)',
      'Use the Rule of 72 to estimate doubling time in your head',
      'Contrast simple interest with compound interest over 10, 20, and 30-year horizons',
      'Recognize why early consistent contributions dwarf late lump sums'
    ],
    lessons: [
      {
        id: 'sc-1',
        moduleId: 'saving-compounding',
        title: 'The Eighth Wonder: Exponential vs Linear Growth',
        duration: '7 mins',
        summary: 'Linear thinking fails to grasp how compounding snowballs over decades.',
        keyTakeaway: 'In compounding, the majority of your final wealth comes not from your capital contributions, but from returns earned on previous returns.',
        formula: 'A = P * (1 + r/n)^(n*t)',
        workedExample: {
          scenario: 'Investing ₹5,000 monthly at 12% annualized return for 25 years.',
          calculation: 'Total personal investment = ₹15 Lakhs. Final portfolio value = ~₹95 Lakhs. Compounded returns generated = ~₹80 Lakhs (over 5x your contributions!).',
          insight: 'Time is the heaviest multiplier in the formula. Delaying by just 5 years cuts the final corpus by nearly half.'
        },
        content: [
          'Human brains naturally think linearly: if 1 year gives ₹1,000, 10 years must give ₹10,000. But compound interest is geometric.',
          'In year 1, you earn returns on your principal. In year 5, you earn returns on your principal plus four years of accumulated returns. By year 20, the annual return dwarfs your annual contribution.'
        ]
      },
      {
        id: 'sc-2',
        moduleId: 'saving-compounding',
        title: 'Mental Math: The Rule of 72',
        duration: '6 mins',
        summary: 'Quickly calculate how many years it takes for an investment to double.',
        keyTakeaway: 'Divide 72 by the annual interest rate to find the approximate doubling time.',
        formula: 'Doubling Years ≈ 72 / Annual Interest Rate (%)',
        workedExample: {
          scenario: 'Comparing a 6% Fixed Deposit vs a 12% diversified index fund.',
          calculation: 'At 6%: 72 / 6 = 12 years to double. At 12%: 72 / 12 = 6 years to double.',
          insight: 'Over a 24-year span, the 6% asset doubles twice (4x total). The 12% asset doubles four times (16x total!). A 2x difference in rate produces a 4x difference in outcome.'
        },
        content: [
          'The Rule of 72 provides an instant heuristic for evaluating financial claims.',
          'It also works in reverse for inflation: if inflation is 6%, your purchasing power halves every 12 years unless protected.'
        ]
      },
      {
        id: 'sc-3',
        moduleId: 'saving-compounding',
        title: 'The High Cost of Waiting: A Tale of Two Savers',
        duration: '8 mins',
        summary: 'Why starting with ₹2,000 at age 20 easily beats ₹10,000 at age 35.',
        keyTakeaway: 'You can never buy back lost compounding years. Early discipline is a superpower.',
        content: [
          'Consider Rahul who invests ₹3,000/month from age 21 to 30 (10 years, ₹3.6 Lakhs total) and never adds another rupee. At 12% return, by age 60 his fund reaches ~₹1.8 Crore.',
          'His friend Karan starts at age 30 and invests ₹3,000/month until age 60 (30 years, ₹10.8 Lakhs total). Karan invested 3x more money, yet ends with less than Rahul (~₹1.05 Crore). Time in the market trumps timing the market.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-sc-1',
        moduleId: 'saving-compounding',
        scenario: 'An investment promises an annual return of 9%. Using the Rule of 72, approximately how long will it take for your initial capital to double?',
        options: [
          {
            id: 'a',
            text: 'Approximately 8 years (72 ÷ 9 = 8).',
            isCorrect: true,
            explanation: 'Spot on! 72 divided by 9 equals 8 years.'
          },
          {
            id: 'b',
            text: 'Approximately 12 years.',
            isCorrect: false,
            misconception: 'Arithmetic Calculation Error',
            explanation: '72 ÷ 9 = 8, not 12. 12 years would correspond to a 6% interest rate.'
          },
          {
            id: 'c',
            text: 'Doubling time depends purely on whether you deposit lump sum or monthly.',
            isCorrect: false,
            misconception: 'Compounding Independence Fallacy',
            explanation: 'The doubling period of any fixed sum is determined strictly by its compounded annual growth rate.'
          }
        ]
      }
    ]
  },
  {
    id: 'inflation-purchasing-power',
    order: 3,
    title: 'Inflation & Purchasing Power',
    tagline: 'Real vs nominal returns, CPI, and the silent wealth erosion',
    duration: '25 mins',
    level: 'Beginner',
    overview: 'Keeping money in cash or low-interest accounts feels safe, but inflation guarantees guaranteed loss of purchasing power over time.',
    learningOutcomes: [
      'Distinguish nominal returns from real (inflation-adjusted) returns',
      'Calculate net real yield after adjusting for annual inflation and tax brackets',
      'Explain Consumer Price Index (CPI) and lifestyle inflation',
      'Select inflation-beating asset classes to preserve multi-decade wealth'
    ],
    lessons: [
      {
        id: 'inf-1',
        moduleId: 'inflation-purchasing-power',
        title: 'The Silent Tax: What is Inflation?',
        duration: '6 mins',
        summary: 'Inflation is not just rising prices; it is the devaluation of your currency.',
        keyTakeaway: 'If prices rise by 6% each year, a ₹100 note buys only ₹94 worth of goods next year.',
        formula: 'Real Return ≈ Nominal Return - Inflation Rate - Taxes',
        workedExample: {
          scenario: '₹1 Lakh in a 7% bank fixed deposit with 6% annual inflation and 20% income tax bracket.',
          calculation: 'Nominal interest = ₹7,000. Post-tax return = ₹5,600 (5.6%). Real return = 5.6% - 6.0% = -0.4% per year.',
          insight: 'Even though your bank balance increased on paper, you actually lost real purchasing power!'
        },
        content: [
          'Cash sitting in a zero-interest savings account is not safe—it is guaranteed to lose purchasing power.',
          'To preserve and grow wealth, your portfolio must generate returns that comfortably exceed the prevailing inflation rate after taxes.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-inf-1',
        moduleId: 'inflation-purchasing-power',
        scenario: 'A savings account pays 4% interest per annum. Over the same year, the consumer inflation rate is 6.5%. What happened to your purchasing power?',
        options: [
          {
            id: 'a',
            text: 'It grew by 4% because my rupee balance is higher.',
            isCorrect: false,
            misconception: 'Nominal Illusion / Money Illusion',
            explanation: 'Confusing nominal rupees with real purchasing power is the most common financial illusion. You have more rupees, but they buy less.'
          },
          {
            id: 'b',
            text: 'It decreased by approximately 2.5% because goods became more expensive faster than the savings grew.',
            isCorrect: true,
            explanation: 'Exactly right! Real return = 4% - 6.5% = -2.5% purchasing power loss.'
          },
          {
            id: 'c',
            text: 'It remained unaffected because bank accounts are government insured.',
            isCorrect: false,
            misconception: 'Insurance vs Purchasing Power Confusion',
            explanation: 'Deposit insurance protects against bank insolvency, not the economic loss of purchasing power from inflation.'
          }
        ]
      }
    ]
  },
  {
    id: 'investment-vehicles',
    order: 4,
    title: 'Investment Vehicles',
    tagline: 'Equities, debt, gold, real estate, and government bonds compared',
    duration: '35 mins',
    level: 'Intermediate',
    overview: 'Demystify every major asset class. Learn their underlying mechanisms, historical risk-return profiles, liquidity, and ideal time horizons.',
    learningOutcomes: [
      'Compare equity ownership with debt lending mechanisms',
      'Evaluate Sovereign Gold Bonds vs physical gold purity and costs',
      'Understand how bond yields move inversely to interest rates',
      'Match financial goals to appropriate asset vehicle horizons'
    ],
    lessons: [
      {
        id: 'iv-1',
        moduleId: 'investment-vehicles',
        title: 'Ownership vs Lending: Equity vs Debt',
        duration: '8 mins',
        summary: 'All financial instruments fundamentally boil down to ownership or debt.',
        keyTakeaway: 'Equities make you a fractional business owner (higher volatility, long-term growth). Bonds make you a lender (fixed income, capital stability).',
        content: [
          'When you buy equity shares, you own a piece of a business. If the business grows profits, you participate via dividends and share price appreciation. However, if the business struggles, your capital can decline.',
          'When you buy debt (bonds, fixed deposits, treasury bills), you are loaning money to an institution or government in exchange for predetermined periodic interest payments and principal return.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-iv-1',
        moduleId: 'investment-vehicles',
        scenario: 'You have a non-negotiable financial goal: paying university tuition fees due in 9 months. Which vehicle is most suitable?',
        options: [
          {
            id: 'a',
            text: 'High-growth mid-cap equity mutual funds for maximum upside.',
            isCorrect: false,
            misconception: 'Mismatched Time Horizon Risk',
            explanation: 'Equities require a 5+ year horizon. In a 9-month window, market drawdowns could wipe out funds needed for tuition.'
          },
          {
            id: 'b',
            text: 'High-quality liquid debt fund or bank fixed deposit matching the exact maturity date.',
            isCorrect: true,
            explanation: 'Correct! Goals within 1 year require absolute capital safety and liquidity, not equity market risk.'
          },
          {
            id: 'c',
            text: 'Physical gold coins from a jewelry shop.',
            isCorrect: false,
            misconception: 'Liquidity & Making Charge Neglect',
            explanation: 'Physical gold incurs 10-20% making charges, purity spreads, and GST, making it completely ill-suited for short-term tuition payments.'
          }
        ]
      }
    ]
  },
  {
    id: 'risk-diversification',
    order: 5,
    title: 'Risk & Diversification',
    tagline: 'Systematic vs unsystematic risk, correlation, and asset allocation',
    duration: '30 mins',
    level: 'Intermediate',
    overview: 'Diversification is the only free lunch in finance. Learn how combining uncorrelated assets reduces portfolio volatility without sacrificing long-term returns.',
    learningOutcomes: [
      'Distinguish company-specific (unsystematic) risk from market-wide (systematic) risk',
      'Explain how negative and low correlation buffers drawdowns',
      'Determine portfolio asset allocation based on risk capacity and horizon',
      'Implement disciplined periodic portfolio rebalancing'
    ],
    lessons: [
      {
        id: 'rd-1',
        moduleId: 'risk-diversification',
        title: 'The Only Free Lunch: Why Diversification Works',
        duration: '7 mins',
        summary: 'Holding 30 stocks across different sectors protects you from any single corporate bankruptcy.',
        keyTakeaway: 'You cannot eliminate market risk (recessions affect everyone), but you can eliminate specific company failure risk by holding broad baskets.',
        content: [
          'If you invest 100% of your money into one tech stock and the CEO commits fraud, you lose everything.',
          'If you own 50 stocks across banking, healthcare, energy, IT, and consumer goods, a collapse in one company barely impacts your total portfolio.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-rd-1',
        moduleId: 'risk-diversification',
        scenario: 'An investor puts 100% of their investment capital into 5 different IT services companies (e.g. TCS, Infosys, Wipro, HCL, Tech Mahindra). Are they adequately diversified?',
        options: [
          {
            id: 'a',
            text: 'Yes, because they hold 5 different publicly listed companies.',
            isCorrect: false,
            misconception: 'Single-Sector Concentration Illusion',
            explanation: 'Holding multiple companies in the exact same sector leaves the investor vulnerable to IT-wide headwinds, currency fluctuations, or tech spending slowdowns.'
          },
          {
            id: 'b',
            text: 'No, because all 5 companies belong to the same sector and share high correlation to global IT spending cycles.',
            isCorrect: true,
            explanation: 'Spot on! True diversification requires cross-sector and cross-asset class non-correlation.'
          }
        ]
      }
    ]
  },
  {
    id: 'mutual-funds-etfs',
    order: 6,
    title: 'Mutual Funds & ETFs',
    tagline: 'Expense ratios, passive indexing, SIP discipline, and tracking errors',
    duration: '35 mins',
    level: 'Intermediate',
    overview: 'Discover how modern pooled vehicles enable anyone to own the top 50 Indian companies for as little as ₹500/month with rock-bottom fees.',
    learningOutcomes: [
      'Understand how Mutual Funds and Exchange Traded Funds (ETFs) pool investor capital',
      'Calculate the compounding drag of a 1.5% active expense ratio vs 0.1% index ETF',
      'Automate rupee-cost averaging via Systematic Investment Plans (SIP)',
      'Evaluate direct vs regular mutual fund share classes'
    ],
    lessons: [
      {
        id: 'mf-etf-1',
        moduleId: 'mutual-funds-etfs',
        title: 'The Power of Low-Cost Passive Indexing',
        duration: '8 mins',
        summary: 'Most active fund managers fail to beat the index after accounting for fees.',
        keyTakeaway: 'Choosing a Direct Plan Nifty 50 Index Fund saves you up to 1-1.5% in distributor commissions and management fees annually.',
        content: [
          'An index fund simply replicates a broad market index like the Nifty 50 or Sensex. It buys the largest 50 companies proportional to their market weight.',
          'Because there is no expensive fund manager making speculative bets, expense ratios are minimal (often under 0.15%), leaving more compounded returns in your pocket.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-mf-1',
        moduleId: 'mutual-funds-etfs',
        scenario: 'Fund A is an active mutual fund with a 1.8% expense ratio. Fund B is a passive Nifty 50 index fund with a 0.1% expense ratio. Over 25 years, what is the impact of this 1.7% fee difference?',
        options: [
          {
            id: 'a',
            text: 'Negligible, because 1.7% is just a tiny annual fee.',
            isCorrect: false,
            misconception: 'Fee Compounding Neglect',
            explanation: 'Compounded over 25 years, a 1.7% annual fee difference can consume 30% to 40% of your total final wealth corpus!'
          },
          {
            id: 'b',
            text: 'Massive, because fees compound just like returns, potentially eroding over 30% of your terminal portfolio value.',
            isCorrect: true,
            explanation: 'Correct! Keeping expense ratios low is one of the few guaranteed levers an investor controls.'
          }
        ]
      }
    ]
  },
  {
    id: 'stock-markets-decision-making',
    order: 7,
    title: 'Stock Markets & Decision-Making',
    tagline: 'Market mechanics, emotional discipline, valuation basics, and behavioral biases',
    duration: '40 mins',
    level: 'Advanced Capstone',
    overview: 'The final frontier of finance is behavioral psychology. Master emotional discipline, avoid herd mentality panic selling, and build a lifelong investment philosophy.',
    learningOutcomes: [
      'Recognize behavioral traps: FOMO, loss aversion, recency bias, and sunk cost fallacy',
      'Understand how stock prices fluctuate in the short run (voting machine) vs long run (weighing machine)',
      'Conduct basic business health checks: P/E ratios, debt-to-equity, and free cashflow',
      'Formulate a personal written investment policy statement before deploying real capital'
    ],
    lessons: [
      {
        id: 'sm-1',
        moduleId: 'stock-markets-decision-making',
        title: 'The Psychology of Market Cycles: Greed and Fear',
        duration: '9 mins',
        summary: 'In the short run, the market is a voting machine; in the long run, it is a weighing machine.',
        keyTakeaway: 'The biggest threat to an investor’s long-term returns is not market crashes—it is the investor’s own emotional impulse to sell at bottoms.',
        content: [
          'Markets naturally swing between euphoric bubbles where beginners believe "this time is different" and despairing panics where headlines claim the economy is doomed.',
          'Having a rule-based plan and an automated SIP insulates you from emotional mistakes.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-sm-1',
        moduleId: 'stock-markets-decision-making',
        scenario: 'The stock market drops 18% over two weeks due to global macroeconomic headlines. Your diversified index fund SIP is scheduled for tomorrow. What does sound behavioral finance advise?',
        options: [
          {
            id: 'a',
            text: 'Cancel the SIP and sell all holdings to prevent further losses, waiting until the market recovers to buy back.',
            isCorrect: false,
            misconception: 'Panic Selling & Market Timing Trap',
            explanation: 'Selling during a downturn locks in paper losses. Buying back after the market recovers means you systematically sell low and buy high.'
          },
          {
            id: 'b',
            text: 'Maintain your disciplined automated SIP, taking advantage of rupee-cost averaging to acquire more fund units at discounted prices.',
            isCorrect: true,
            explanation: 'Spot on! Market corrections are a natural feature of equity investing and reward disciplined, long-term accumulators.'
          }
        ]
      }
    ]
  }
];

export interface SandboxInstrument {
  id: string;
  ticker: string;
  name: string;
  category: 'equity' | 'debt' | 'gold' | 'liquid';
  price: number;
  changePercent: number;
  description: string;
  riskRating: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  expenseRatio: string;
}

export const SANDBOX_INSTRUMENTS: SandboxInstrument[] = [
  {
    id: 'nifty50',
    ticker: 'NIFTY50_ETF',
    name: 'Nifty 50 Index Fund ETF',
    category: 'equity',
    price: 245.50,
    changePercent: 0.82,
    description: 'Baskets top 50 largest Indian companies by market cap. Broad, diversified large-cap equity foundation.',
    riskRating: 'Moderate',
    expenseRatio: '0.08%'
  },
  {
    id: 'niftynext50',
    ticker: 'NEXT50_ETF',
    name: 'Nifty Next 50 Growth ETF',
    category: 'equity',
    price: 680.20,
    changePercent: -0.45,
    description: 'Companies ranked 51-100. Higher potential growth with moderate increase in volatility.',
    riskRating: 'High',
    expenseRatio: '0.15%'
  },
  {
    id: 'sgb',
    ticker: 'GOLD_SGB',
    name: 'Sovereign Gold Bond Proxy',
    category: 'gold',
    price: 7250.00,
    changePercent: 0.35,
    description: 'Tracks domestic gold price with sovereign backing. Traditional hedge against currency depreciation.',
    riskRating: 'Low',
    expenseRatio: '0.00%'
  },
  {
    id: 'gsec',
    ticker: 'GSEC_10Y',
    name: '10-Year Government Securities Fund',
    category: 'debt',
    price: 1050.00,
    changePercent: 0.05,
    description: 'Lending directly to Government of India. Sovereign credit safety with fixed yield curve.',
    riskRating: 'Very Low',
    expenseRatio: '0.12%'
  },
  {
    id: 'liquid_fd',
    ticker: 'LIQUID_FD',
    name: 'Liquid Cash Buffer / Overnight FD',
    category: 'liquid',
    price: 100.00,
    changePercent: 0.02,
    description: 'Ultra-safe overnight liquid interest generator. Zero equity volatility, accessible for emergency liquidity.',
    riskRating: 'Very Low',
    expenseRatio: '0.05%'
  }
];

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
}

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'First Step Taken',
    description: 'Completed the baseline assessment and established starting knowledge score.',
    icon: 'Compass',
    category: 'Diagnostic',
    unlocked: true
  },
  {
    id: 'compounding-scholar',
    title: 'Compounding Scholar',
    description: 'Mastered the Rule of 72 and demonstrated exponential growth math.',
    icon: 'TrendingUp',
    category: 'Mastery',
    unlocked: false
  },
  {
    id: 'inflation-shield',
    title: 'Inflation Shield',
    description: 'Identified real purchasing power loss and avoided nominal money illusions.',
    icon: 'ShieldCheck',
    category: 'Mastery',
    unlocked: false
  },
  {
    id: 'balanced-allocator',
    title: 'Prudent Allocator',
    description: 'Constructed a balanced ₹10,000 sandbox portfolio meeting diversification guardrails.',
    icon: 'PieChart',
    category: 'Practice',
    unlocked: false
  },
  {
    id: 'bias-breaker',
    title: 'Bias Breaker',
    description: 'Debiased 3 consecutive misconceptions in quizzes without guessing.',
    icon: 'Sparkles',
    category: 'Thinking',
    unlocked: false
  }
];
