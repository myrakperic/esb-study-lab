const DOMAINS = [
  { id: "entrepreneur", name: "The Entrepreneur", note: "Traits, self-assessment, risks, rewards, and paths into ownership." },
  { id: "opportunity", name: "Opportunity Recognition", note: "Demand, customer segments, research, competition, and value propositions." },
  { id: "startup", name: "Starting a Business", note: "Business plans, legal structures, funding, regulation, ethics, and exit plans." },
  { id: "operations", name: "Business Operations", note: "People, workflow, tax, intellectual property, supply chains, and growth." },
  { id: "marketing", name: "Marketing & Sales", note: "The marketing mix, customer acquisition, sales, retention, and communication." },
  { id: "finance", name: "Financial Management", note: "Statements, expenses, pricing, credit, cash flow, and break-even." }
];

const q = (domain, prompt, choices, answer, explanation) => ({ domain, prompt, choices, answer, explanation });
const fillQ = (domain, prompt, answers, explanation) => ({ domain, type: "fill", prompt, answers, answer: answers[0], explanation });
const matchingQ = (domain, prompt, pairs, explanation) => ({ domain, type: "matching", prompt, pairs, answer: "All terms matched correctly", explanation });
const essayQ = (domain, prompt, rubric) => ({ domain, type: "essay", prompt, answer: "Self-review with the rubric", explanation: rubric, unscored: true });

const TESTS = [
  {
    id: "foundations", title: "Core Concepts", subtitle: "Build the foundation · mixed formats", minutes: 35, feedback: true,
    description: "Definitions and essential decisions from all six lessons, with multiple choice, fill-in-the-blank, matching, binary, and open-ended items.",
    introduction: "Core Concepts checks essential knowledge from all six ESB domains using multiple-choice, fill-in-the-blank, matching, binary, and open-ended items.",
    directions: [
      "Complete all items in order. The timer begins when you select Begin assessment.",
      "Multiple-choice and binary items have one best answer.",
      "For the fill-in item, enter the requested term in your own words.",
      "For matching, choose the correct definition for every term before checking your matches.",
      "The open-ended response is saved for self-review and is not included in the automatic percentage score."
    ],
    questions: [
      q("entrepreneur", "Which trait best describes an entrepreneur who believes their choices strongly influence business results?", ["High external locus of control", "Internal locus of control", "Low tolerance for ambiguity", "Dependence on consensus"], "Internal locus of control", "An internal locus of control means believing that personal effort and decisions can influence outcomes."),
      q("entrepreneur", "Why should a prospective entrepreneur complete a self-assessment before launching?", ["To guarantee investor funding", "To identify strengths, gaps, goals, and risk tolerance", "To replace market research", "To calculate tax owed"], "To identify strengths, gaps, goals, and risk tolerance", "A self-assessment tests the founder's fit with the work and reveals skills or resources that must be added."),
      q("entrepreneur", "Which is a common benefit of entrepreneurship?", ["Guaranteed income", "No personal risk", "Greater control over decisions", "Freedom from long work hours"], "Greater control over decisions", "Ownership can provide autonomy and upside, but income, hours, and outcomes are not guaranteed."),
      q("opportunity", "What turns a business idea into a credible opportunity?", ["The founder likes it", "It solves a customer problem and has evidence of demand", "No competitor has ever tried it", "It requires a large loan"], "It solves a customer problem and has evidence of demand", "An opportunity links a real need to customers who are willing and able to buy a workable solution."),
      q("opportunity", "Which action provides the strongest direct evidence of customer demand?", ["Reading a motivational article", "Interviewing target customers and testing preorders", "Choosing a logo", "Registering a domain name"], "Interviewing target customers and testing preorders", "Primary research and real buying behavior provide stronger demand evidence than branding activity."),
      q("opportunity", "A value proposition should primarily explain:", ["The owner's résumé", "Why a customer should choose the offer", "Every item in the budget", "The legal name of the company"], "Why a customer should choose the offer", "A value proposition states the customer benefit, the problem solved, and the reason the offer is meaningfully different."),
      q("opportunity", "Grouping customers by age, income, and education is which type of segmentation?", ["Geographic", "Behavioral", "Psychographic", "Demographic"], "Demographic", "Demographic segmentation uses measurable population traits such as age, income, occupation, or education."),
      q("startup", "What is the main purpose of a business plan?", ["To eliminate all uncertainty", "To explain the business model, market, operations, and financial needs", "To serve only as an advertisement", "To replace required licenses"], "To explain the business model, market, operations, and financial needs", "A business plan organizes how the venture will create value and often communicates the plan to lenders or investors."),
      q("startup", "What is a major disadvantage of a sole proprietorship?", ["Complex corporate reporting", "Unlimited personal liability", "Required public stock offering", "Shared control with shareholders"], "Unlimited personal liability", "The owner and business are generally the same legal entity, so personal assets can be exposed to business obligations."),
      q("startup", "Why should partners create a written partnership agreement?", ["To avoid defining responsibilities", "To document ownership, decisions, profit sharing, and exits", "To guarantee the partnership never ends", "To eliminate all taxes"], "To document ownership, decisions, profit sharing, and exits", "A written agreement reduces ambiguity about authority, contributions, distributions, disputes, and departure."),
      q("startup", "Which funding source gives money in exchange for an ownership interest?", ["Equity investment", "Trade credit", "Bank debt", "Customer deposit"], "Equity investment", "Equity investors receive ownership. Debt providers expect repayment with interest and generally do not own the company."),
      q("operations", "What is the main value of a standard operating procedure (SOP)?", ["It makes every decision spontaneous", "It documents a repeatable way to perform a task", "It replaces employee training", "It prevents process improvement"], "It documents a repeatable way to perform a task", "SOPs support consistency, training, quality, and accountability while still allowing approved improvement."),
      q("operations", "Division of labor usually improves productivity by:", ["Having everyone perform every job", "Allowing people to specialize in defined tasks", "Removing all supervision", "Eliminating communication"], "Allowing people to specialize in defined tasks", "Specialization builds speed and skill, though the business must coordinate the separate roles."),
      q("operations", "Which intellectual property protection identifies the source of goods or services?", ["Patent", "Trademark", "Copyright", "Trade credit"], "Trademark", "A trademark protects source identifiers such as brand names, logos, and slogans."),
      q("operations", "What does a supply chain describe?", ["Only the final sales conversation", "The flow of inputs, information, and products from suppliers to customers", "A list of employees", "A schedule of tax payments"], "The flow of inputs, information, and products from suppliers to customers", "Supply chain management coordinates sourcing, production, inventory, distribution, and related information."),
      q("marketing", "Which list contains the traditional four Ps of marketing?", ["Product, price, place, promotion", "People, patent, profit, payroll", "Plan, process, purpose, payment", "Product, personnel, purchasing, profit"], "Product, price, place, promotion", "The marketing mix aligns the offer, price, distribution channel, and communication."),
      q("marketing", "Why is retaining a good existing customer often valuable?", ["Retention always costs more than acquisition", "Repeat customers can create recurring revenue and referrals", "Existing customers never need service", "Retention removes all competition"], "Repeat customers can create recurring revenue and referrals", "Strong retention can raise lifetime value and reduce the continual cost of replacing lost customers."),
      q("finance", "Which financial statement reports revenue and expenses over a period?", ["Balance sheet", "Income statement", "Cash receipt", "Purchase order"], "Income statement", "The income statement measures performance over time by subtracting expenses from revenue to reach profit or loss."),
      q("finance", "Which equation underlies a balance sheet?", ["Revenue − expenses = cash", "Assets = liabilities + owner's equity", "Price × tax = equity", "Sales + inventory = debt"], "Assets = liabilities + owner's equity", "The balance sheet must remain in balance: resources are financed by creditor claims and owner claims."),
      q("finance", "A product sells for $50 and has a variable cost of $30. What is its contribution margin per unit?", ["$20", "$30", "$50", "$80"], "$20", "Contribution margin per unit equals selling price minus variable cost: $50 − $30 = $20."),
      fillQ("finance", "Fill in the blank: Selling price minus variable cost per unit equals the ________ per unit.", ["contribution margin", "unit contribution margin"], "Contribution margin per unit is the amount each sale contributes toward fixed costs and profit."),
      matchingQ("startup", "Match each business term with its correct definition.", [
        ["Value proposition", "The reason a target customer should choose the offer"],
        ["Target market", "The defined group of customers the business intends to serve"],
        ["SOP", "A documented repeatable method for completing a task"],
        ["Equity financing", "Capital exchanged for an ownership interest"]
      ], "A value proposition explains customer benefit; a target market defines the intended buyers; an SOP documents a process; and equity financing exchanges capital for ownership."),
      { ...q("opportunity", "Binary item — True or False: In a SWOT analysis, strengths and weaknesses are internal factors.", ["True", "False"], "True", "Strengths and weaknesses are internal. Opportunities and threats are external."), type: "binary" },
      essayQ("opportunity", "A neighborhood café has loyal customers and skilled employees, but weak cash reserves. A new office complex is opening nearby while a national competitor is entering the area. Write a short recommendation that uses at least one strength, weakness, opportunity, and threat.", "Self-review rubric: identify all four SWOT factors accurately, recommend a specific action, explain how a strength can pursue the opportunity, and address the weakness or threat with a practical safeguard.")
    ]
  },
  {
    id: "applied", title: "Applied Decisions", subtitle: "Think like an owner", minutes: 30, feedback: true,
    description: "Scenario questions that ask you to choose the strongest business action. Feedback appears after each answer.",
    questions: [
      q("entrepreneur", "A founder has strong product skills but avoids sales conversations. What is the best response to this self-assessment result?", ["Ignore the weakness", "Cancel the venture immediately", "Develop the skill or add a teammate who can sell", "Assume customers will find the product"], "Develop the skill or add a teammate who can sell", "Self-awareness is useful when it leads to skill building, role design, or complementary hires."),
      q("entrepreneur", "An entrepreneur chooses a franchise mainly because it offers:", ["Total freedom from operating rules", "A tested brand and operating system", "Guaranteed profit", "No fees or royalties"], "A tested brand and operating system", "A franchise can reduce some startup uncertainty through a known system and brand, though it limits autonomy and charges fees."),
      q("entrepreneur", "Which is the clearest tradeoff when buying an existing business?", ["It has no operating history", "The buyer gains existing operations but may inherit hidden problems", "It cannot have customers", "It never requires financing"], "The buyer gains existing operations but may inherit hidden problems", "Existing customers, staff, and cash flow help, but due diligence must uncover liabilities, weak contracts, or reputation issues."),
      q("opportunity", "A meal-prep company targets busy parents within five kilometers of its kitchen. Which two segmentation bases are being used?", ["Behavioral and income", "Psychographic and age", "Lifestyle/need and geographic", "Education and occupation"], "Lifestyle/need and geographic", "The segment is defined by a need or lifestyle trait (busy parents) and a location boundary."),
      q("opportunity", "A startup wants to test its value proposition before building a full app. What is the best first experiment?", ["Build every planned feature", "Create a simple landing page and measure sign-ups", "Lease a larger office", "File tax returns early"], "Create a simple landing page and measure sign-ups", "A small test can measure real interest quickly and cheaply before the company commits major resources."),
      q("opportunity", "Customer interviews reveal that buyers value fast delivery more than extra features. What should the business do first?", ["Ignore the interviews", "Refine the offer around reliable speed", "Raise every price immediately", "Target all customers equally"], "Refine the offer around reliable speed", "The value proposition should reflect the benefit customers actually prioritize."),
      q("startup", "Two founders want liability protection and flexible internal management without selling public shares. Which structure best fits in many jurisdictions?", ["Sole proprietorship", "Limited liability company", "Informal hobby", "General partnership with no agreement"], "Limited liability company", "An LLC commonly combines liability protection with flexible management; exact rules and names vary by jurisdiction."),
      q("startup", "Before opening a food business, the owner should first verify:", ["Only the logo color", "Required registrations, licenses, zoning, and health rules", "The competitor's passwords", "That taxes are optional"], "Required registrations, licenses, zoning, and health rules", "Legal operation depends on applicable registration, licensing, zoning, food safety, employment, and tax requirements."),
      q("startup", "A company discovers that a product claim is technically legal but likely to mislead customers. What is the strongest ethical choice?", ["Use the claim until someone complains", "Make the claim clearer and support it with evidence", "Hide the qualification in tiny text", "Ask employees not to discuss it"], "Make the claim clearer and support it with evidence", "Ethical communication should be truthful, understandable, and supported, protecting trust beyond bare legal compliance."),
      q("startup", "Which is an example of a planned exit strategy?", ["Ignoring succession", "Selling the company to a strategic buyer", "Avoiding financial records", "Never delegating decisions"], "Selling the company to a strategic buyer", "Possible exits include a sale, merger, family succession, management buyout, or orderly closure."),
      q("operations", "A new employee starts handling customer payments. Which action best protects the business?", ["Provide no written expectations", "Use documented hiring, training, access, and cash-control procedures", "Give unlimited system access", "Skip identity and reference checks where lawful"], "Use documented hiring, training, access, and cash-control procedures", "Clear documentation, role-based access, training, and internal controls reduce operational and fraud risk."),
      q("operations", "Which cost is most likely variable for a bakery?", ["Monthly storefront rent", "Annual business license", "Flour used in each loaf", "Owner's fixed insurance premium"], "Flour used in each loaf", "Variable costs change with output. Flour consumption rises as more loaves are produced."),
      q("operations", "A company invents a new, useful mechanical process. Which protection may apply if legal requirements are met?", ["Patent", "Trademark", "Copyright for the idea itself", "Customer warranty"], "Patent", "Patents can protect qualifying inventions and processes; trademarks identify source and copyright protects original expression."),
      q("operations", "Which change best supports environmental sustainability and cost control?", ["Discard usable materials", "Measure energy and material waste, then reduce both", "Overproduce inventory", "Use more packaging without testing"], "Measure energy and material waste, then reduce both", "Reducing wasted energy and materials can lower environmental impact and operating cost at the same time."),
      q("marketing", "A salesperson asks questions, listens, and recommends only the plan that fits the customer's needs. This is:", ["Consultative selling", "Mass production", "Price skimming", "Tax planning"], "Consultative selling", "Consultative selling diagnoses the customer's needs and connects them to an appropriate solution."),
      q("marketing", "A brand wants to be known as the fastest same-day repair service. This desired place in the customer's mind is its:", ["Depreciation", "Positioning", "Payroll", "Legal structure"], "Positioning", "Positioning defines how a target customer should perceive the offer relative to alternatives."),
      q("marketing", "Which response demonstrates active listening to an unhappy customer?", ["Interrupt with a defense", "Restate the concern and confirm the desired resolution", "Change the subject", "Promise an impossible result"], "Restate the concern and confirm the desired resolution", "Paraphrasing and confirming show understanding before proposing a fair solution."),
      q("finance", "A product costs $24 to make. Competitors charge $45–$50 and customers value premium support. Which pricing approach is strongest?", ["Automatically charge $24", "Consider cost, customer value, competitors, and profit goals", "Always choose the lowest price", "Ignore willingness to pay"], "Consider cost, customer value, competitors, and profit goals", "Pricing should cover costs while reflecting perceived value, market conditions, positioning, and required margin."),
      q("finance", "A business has revenue of $120,000 and cost of goods sold of $72,000. What is gross profit?", ["$48,000", "$72,000", "$120,000", "$192,000"], "$48,000", "Gross profit equals revenue minus cost of goods sold: $120,000 − $72,000 = $48,000."),
      q("finance", "Which action most directly helps build a stronger business credit profile?", ["Pay obligations late", "Borrow without tracking balances", "Pay bills on time and keep credit use manageable", "Mix every personal and business transaction"], "Pay bills on time and keep credit use manageable", "Payment history, responsible utilization, accurate records, and separated finances support creditworthiness." )
    ]
  },
  {
    id: "simulation", title: "Final Simulation", subtitle: "Exam conditions", minutes: 35, feedback: false,
    description: "A mixed, more demanding set. Answers and explanations stay hidden until you submit the full test.",
    questions: [
      q("entrepreneur", "Which situation best demonstrates calculated risk rather than reckless risk?", ["Investing all available cash without research", "Estimating downside, testing assumptions, and setting a loss limit", "Copying a competitor without checking demand", "Ignoring insurance because failure seems unlikely"], "Estimating downside, testing assumptions, and setting a loss limit", "Calculated risk uses evidence, small experiments, contingency plans, and limits on exposure."),
      q("entrepreneur", "A founder repeatedly revises a product after setbacks while keeping the customer goal in view. Which entrepreneurial quality is strongest?", ["Persistence and adaptability", "Dependence", "Risk avoidance", "Complacency"], "Persistence and adaptability", "Effective entrepreneurs persist while learning and adjusting; persistence is not blind repetition."),
      q("opportunity", "Which is primary market research?", ["Reading a government industry report", "Analyzing a competitor's published prices", "Surveying prospective customers", "Reviewing a trade association forecast"], "Surveying prospective customers", "Primary research is collected directly for the current decision. The other choices use existing secondary data."),
      q("opportunity", "In a SWOT analysis, a new competitor entering the market is usually classified as:", ["Strength", "Weakness", "Opportunity", "Threat"], "Threat", "Threats are external conditions that may harm performance. Strengths and weaknesses are internal."),
      q("opportunity", "Which statement is the strongest value proposition?", ["We opened in 2024", "Our insulated delivery box keeps restaurant meals hot for 60 minutes, reducing refunds for local couriers", "We sell many things", "Quality is important to us"], "Our insulated delivery box keeps restaurant meals hot for 60 minutes, reducing refunds for local couriers", "It identifies a target, a measurable benefit, and the problem reduced."),
      q("opportunity", "A market has many interested users, but interviews show almost none can pay enough to cover delivery costs. What is missing?", ["A logo", "Economically viable demand", "A mission statement", "A patent"], "Economically viable demand", "Interest alone is not sufficient; the business needs enough customers willing and able to pay a sustainable price."),
      q("startup", "Where should a reader quickly find the business concept, target market, advantage, and key financial request in a plan?", ["Executive summary", "Employee handbook", "Purchase order", "Tax receipt"], "Executive summary", "The executive summary provides a concise overview and is often the first section read, although it is commonly written last."),
      q("startup", "Equipment is $18,000, opening inventory is $7,000, deposits are $3,000, and three months of operating cash is $24,000. What startup financing is required before any owner contribution?", ["$28,000", "$42,000", "$52,000", "$72,000"], "$52,000", "Add all startup and working-capital needs: 18,000 + 7,000 + 3,000 + 24,000 = 52,000."),
      q("startup", "Which statement correctly compares debt and equity financing?", ["Debt gives away ownership; equity must always be repaid monthly", "Debt generally requires repayment; equity gives investors an ownership claim", "Both are grants", "Neither affects control or cash flow"], "Debt generally requires repayment; equity gives investors an ownership claim", "Debt creates repayment obligations. Equity typically does not require scheduled repayment but dilutes ownership and may influence control."),
      q("startup", "A founder wants to preserve a recipe as a trade secret. Which action is most appropriate?", ["Publish the full recipe", "Limit access and use confidentiality agreements", "Register it as a trademark", "Put it in every advertisement"], "Limit access and use confidentiality agreements", "Trade secrets retain value through secrecy, so access controls and confidentiality duties are central."),
      q("operations", "Which control best reduces the risk that one employee can steal cash and hide the theft?", ["Give one person complete control", "Separate receiving cash, recording it, and reconciling the account", "Stop issuing receipts", "Reconcile less often"], "Separate receiving cash, recording it, and reconciling the account", "Segregation of duties makes concealment harder because no single person controls the whole transaction trail."),
      q("operations", "A critical supplier has frequent delays. What is the strongest first response?", ["Ignore the delays", "Measure performance, discuss corrective action, and qualify a backup source", "Double customer promises", "Stop tracking inventory"], "Measure performance, discuss corrective action, and qualify a backup source", "Supplier metrics, corrective plans, safety stock where appropriate, and alternate sources reduce disruption risk."),
      q("operations", "Which milestone is most useful for managing growth?", ["Become successful someday", "Reach 500 active subscribers with monthly churn below 4% by June 30", "Work harder", "Improve everything"], "Reach 500 active subscribers with monthly churn below 4% by June 30", "A useful milestone is specific, measurable, time-bound, and connected to business performance."),
      q("operations", "Why should a growing owner delegate routine decisions with clear authority limits?", ["To remove accountability", "To free capacity while keeping decisions controlled", "To prevent staff development", "To eliminate communication"], "To free capacity while keeping decisions controlled", "Defined delegation allows faster work and employee development while preserving escalation and accountability."),
      q("marketing", "A campaign creates 1,000 leads, 200 sales conversations, and 50 purchases. What percentage of sales conversations convert to purchases?", ["5%", "20%", "25%", "50%"], "25%", "Conversion from conversation to purchase is 50 ÷ 200 = 25%."),
      q("marketing", "Which metric best helps compare the long-term value of customer retention with acquisition cost?", ["Customer lifetime value", "Office square footage", "Number of suppliers", "Accounts payable days only"], "Customer lifetime value", "Customer lifetime value estimates the contribution a relationship produces over time and can be compared with acquisition cost."),
      q("marketing", "A temporary discount code promoted through social media changes which elements of the marketing mix most directly?", ["Price and promotion", "Product and payroll", "Place and patent", "People and tax"], "Price and promotion", "The discount changes price, while social media communicates the offer through promotion."),
      q("finance", "A business has assets of $90,000 and liabilities of $35,000. What is owner's equity?", ["$35,000", "$55,000", "$90,000", "$125,000"], "$55,000", "Using Assets = Liabilities + Equity, equity is $90,000 − $35,000 = $55,000."),
      q("finance", "A company reports revenue of $80,000, cost of goods sold of $32,000, and operating expenses of $38,000. Ignoring tax and interest, what is operating profit?", ["$10,000", "$42,000", "$48,000", "$70,000"], "$10,000", "Revenue minus cost of goods sold minus operating expenses is 80,000 − 32,000 − 38,000 = 10,000."),
      q("finance", "Monthly fixed costs are $12,000. A service sells for $200 and has variable cost of $80. How many sales are needed to break even?", ["60", "100", "150", "200"], "100", "Contribution margin is $120 per sale. Break-even units = 12,000 ÷ 120 = 100.")
    ]
  },
  {
    id: "venture", title: "Venture Builder", subtitle: "Opportunity and startup deep dive", minutes: 30, feedback: true,
    description: "Fresh questions on founders, customers, validation, planning, ownership, funding, ethics, and launch decisions.",
    questions: [
      q("entrepreneur", "A founder enjoys creative work but becomes stressed when monthly income changes. Which self-assessment area needs the closest attention?", ["Logo preference", "Tolerance for financial uncertainty", "Choice of accounting software", "Office layout"], "Tolerance for financial uncertainty", "Entrepreneurship often creates uneven income, so the founder should compare personal financial needs with realistic business volatility."),
      q("entrepreneur", "Which behavior best shows persistence without becoming stubborn?", ["Repeating a failed tactic forever", "Keeping the goal but changing the method when evidence shows a problem", "Ignoring customer feedback", "Refusing help"], "Keeping the goal but changing the method when evidence shows a problem", "Productive persistence combines commitment with learning and adaptation."),
      q("entrepreneur", "What is the opportunity cost of leaving a $55,000 job to run a new venture full time?", ["Only the registration fee", "The salary and benefits from the best job alternative given up", "Every possible future profit", "The amount invested by customers"], "The salary and benefits from the best job alternative given up", "Opportunity cost is the value of the best forgone alternative, including relevant compensation and benefits."),
      q("entrepreneur", "Before buying an existing shop, which item is most important to verify through due diligence?", ["The seller's favorite color", "Financial records, contracts, liabilities, and customer trends", "Only the asking price", "The owner's vacation plans"], "Financial records, contracts, liabilities, and customer trends", "Due diligence tests the seller's claims and uncovers obligations or weaknesses that affect value."),
      q("opportunity", "Which source is secondary market research?", ["A focus group commissioned by the startup", "A new survey of target buyers", "A published industry report", "Observation conducted by the founder"], "A published industry report", "Secondary research uses information collected previously by another source."),
      q("opportunity", "Customers are grouped by values, interests, and lifestyle. Which segmentation method is this?", ["Psychographic", "Geographic", "Demographic", "Industrial"], "Psychographic", "Psychographic segmentation focuses on attitudes, interests, values, personalities, and lifestyles."),
      q("opportunity", "A founder asks ten friends whether they like an idea and all say yes. What is the biggest research weakness?", ["The sample may not represent paying target customers", "Ten responses always prove demand", "Friends are primary data, so no weakness exists", "The research contains too many transactions"], "The sample may not represent paying target customers", "Convenience samples can be biased, and stated approval is weaker than observed willingness to pay."),
      q("opportunity", "Which result best validates demand for a proposed workshop?", ["Many social-media likes", "Twenty target customers place refundable deposits", "The founder designs a brochure", "A competitor changes its logo"], "Twenty target customers place refundable deposits", "Deposits show stronger purchase intent than low-commitment signals such as likes."),
      q("opportunity", "A competitor offers lower prices, while your service offers verified same-day completion. What should positioning emphasize?", ["Being identical to the competitor", "Reliable speed for customers who value time", "Every possible customer benefit equally", "The founder's personal preferences"], "Reliable speed for customers who value time", "Strong positioning connects a distinctive advantage to a target customer's priority."),
      q("opportunity", "What is the main purpose of a minimum viable product?", ["To include every future feature", "To test key assumptions with the least sufficient solution", "To avoid customer contact", "To guarantee profitability"], "To test key assumptions with the least sufficient solution", "An MVP accelerates learning while limiting the resources risked before validation."),
      q("startup", "Which statement best distinguishes a mission from a vision?", ["A mission explains present purpose; a vision describes a desired future", "A mission is a tax form; a vision is a license", "They are always identical", "A vision lists only daily tasks"], "A mission explains present purpose; a vision describes a desired future", "Mission clarifies why the organization exists now, while vision describes what it hopes to become or create."),
      q("startup", "Why do lenders examine business-plan financial projections?", ["To confirm the logo", "To judge cash needs and the ability to repay", "To replace the legal structure", "To eliminate market risk"], "To judge cash needs and the ability to repay", "Forecasts connect assumptions about sales, costs, cash flow, and financing to repayment capacity."),
      q("startup", "A startup can open for $40,000 but expects a $15,000 cash shortfall before sales stabilize. What minimum total funding need should the plan recognize?", ["$15,000", "$25,000", "$40,000", "$55,000"], "$55,000", "The plan needs both opening costs and working capital for the forecast shortfall: $40,000 + $15,000."),
      q("startup", "Three owners form a general partnership without special liability protection. What risk should they understand?", ["Partners can never make decisions", "Partners may be personally liable for partnership obligations", "The business cannot earn revenue", "All profits must be donated"], "Partners may be personally liable for partnership obligations", "General partners can face personal exposure; rules vary, so owners should obtain jurisdiction-specific advice."),
      q("startup", "Why must a business investigate zoning before signing a long lease?", ["Zoning determines whether the intended activity is allowed at that location", "Zoning guarantees customer demand", "Zoning replaces insurance", "Zoning sets employee wages"], "Zoning determines whether the intended activity is allowed at that location", "A location can be affordable yet legally unusable for the planned operation."),
      q("startup", "In reward-based crowdfunding, contributors most commonly receive:", ["Guaranteed voting shares", "A product, perk, or recognition rather than ownership", "Automatic loan interest", "Control of the board"], "A product, perk, or recognition rather than ownership", "Reward crowdfunding generally exchanges contributions for non-equity rewards; securities rules apply to equity crowdfunding."),
      q("startup", "A manager must choose between a cheaper unsafe material and a safer compliant material. Which stakeholders are most directly affected?", ["Only the owner", "Customers, employees, owners, and the wider community", "Only competitors", "No stakeholders"], "Customers, employees, owners, and the wider community", "Ethical analysis considers the foreseeable effects on all relevant stakeholder groups."),
      q("startup", "An owner plans to transfer the business gradually to a trained family member. This is what type of exit?", ["Succession", "Liquidation by accident", "Market segmentation", "Debt refinancing"], "Succession", "Succession transfers leadership and ownership to a prepared next owner, often over time."),
      q("finance", "A startup needs $75,000. The owner contributes $20,000 and an investor contributes $25,000. How much additional financing is required?", ["$20,000", "$25,000", "$30,000", "$50,000"], "$30,000", "Remaining need is $75,000 − $20,000 − $25,000 = $30,000."),
      q("finance", "Fixed monthly costs are $9,000 and contribution margin is $45 per sale. What is break-even volume?", ["45 sales", "90 sales", "200 sales", "405 sales"], "200 sales", "Break-even units equal fixed costs divided by contribution margin: 9,000 ÷ 45 = 200.")
    ]
  },
  {
    id: "execution", title: "Execution Challenge", subtitle: "Operations, customers, and money", minutes: 30, feedback: true,
    description: "Fresh operational, marketing, sales, and financial scenarios with guided explanations after every answer.",
    questions: [
      q("operations", "What should a well-written job description identify first?", ["Only the employee's hobbies", "Core duties, authority, qualifications, and reporting relationship", "Every future promotion", "The company's customer list"], "Core duties, authority, qualifications, and reporting relationship", "A job description clarifies the role's essential work, required capabilities, accountability, and place in the organization."),
      q("operations", "Which training method best verifies that an employee can perform a safety-critical procedure?", ["Send an unread memo", "Observe a supervised demonstration against a checklist", "Assume prior knowledge", "Ask only whether the employee feels confident"], "Observe a supervised demonstration against a checklist", "Demonstrated performance provides direct evidence of competence and documents the required standard."),
      q("operations", "Why should an SOP show a version number and approval date?", ["To make it longer", "To help employees use the current authorized procedure", "To replace all training", "To hide process changes"], "To help employees use the current authorized procedure", "Document control prevents outdated procedures from remaining in use and creates accountability for changes."),
      q("operations", "A company collects sales tax from customers. The collected amount should generally be treated as:", ["Free profit", "A liability until remitted to the tax authority", "Owner's equity immediately", "A customer discount"], "A liability until remitted to the tax authority", "Collected sales tax is typically held on behalf of the government until reporting and payment are due."),
      q("operations", "Which item is most appropriately protected by copyright?", ["A brand name", "An original training video", "A confidential recipe kept secret", "A new machine mechanism"], "An original training video", "Copyright protects original creative expression such as videos, writing, art, music, and software code."),
      q("operations", "A business stops limiting access to its confidential formula and posts it publicly. What protection is most directly weakened?", ["Trade secret", "Trademark", "Sales tax registration", "Workers' compensation"], "Trade secret", "Trade-secret protection depends on the information remaining secret through reasonable protective measures."),
      q("operations", "Why might a business qualify a second supplier for a critical component?", ["To increase dependence on one vendor", "To reduce disruption risk", "To eliminate quality checks", "To avoid comparing prices"], "To reduce disruption risk", "An approved alternate source can keep operations running when the primary supplier fails."),
      q("operations", "A reorder point should account for expected demand during:", ["Supplier lead time, plus appropriate safety stock", "The previous tax year only", "Employee vacation only", "The product warranty only"], "Supplier lead time, plus appropriate safety stock", "The reorder point triggers replenishment early enough to cover demand while new inventory is in transit."),
      q("operations", "Which measurement best tracks an energy-efficiency initiative?", ["Energy used per unit produced", "Number of logo colors", "Length of company name", "Owner's commute only"], "Energy used per unit produced", "A normalized metric shows whether resource use improves even when production volume changes."),
      q("operations", "Which is the strongest key performance indicator for order accuracy?", ["Orders shipped without error divided by total orders", "Number of desks", "Total website words", "Age of the company"], "Orders shipped without error divided by total orders", "The rate directly measures the quality outcome the operation wants to manage."),
      q("marketing", "A specialized business sells complex industrial equipment to a small group of buyers. Which channel is most suitable?", ["Targeted direct selling", "Untargeted mass advertising only", "No communication", "Consumer coupons in every household"], "Targeted direct selling", "A focused, consultative sales process fits high-value, complex purchases with identifiable decision makers."),
      q("marketing", "In the four Ps, an online store and a retail shop are decisions about:", ["Place", "Promotion", "Product warranty", "Payroll"], "Place", "Place covers distribution channels and how the offering reaches the customer."),
      q("marketing", "A campaign costs $6,000 and gains 120 new customers. What is customer acquisition cost?", ["$5", "$50", "$120", "$720"], "$50", "Customer acquisition cost is $6,000 ÷ 120 = $50 per new customer."),
      q("marketing", "A service begins the month with 800 customers and loses 32, with no adjustment for new customers. What is monthly churn?", ["2%", "4%", "8%", "25%"], "4%", "Churn is customers lost divided by starting customers: 32 ÷ 800 = 4%."),
      q("marketing", "A prospect says, “Your solution costs more than the alternative.” What should a salesperson do first?", ["Argue immediately", "Clarify the concern and connect relevant value to the buyer's needs", "Offer an unauthorized discount", "End the conversation"], "Clarify the concern and connect relevant value to the buyer's needs", "Good objection handling begins with understanding, then responds with relevant evidence rather than pressure."),
      q("marketing", "Which follow-up most supports customer retention after a purchase?", ["Disappear after payment", "Confirm implementation, resolve issues, and check outcomes", "Send unrelated promotions every hour", "Avoid measuring satisfaction"], "Confirm implementation, resolve issues, and check outcomes", "Post-purchase support helps customers realize value and gives the business a chance to correct problems."),
      q("finance", "A profitable business can still run out of cash when:", ["Customers pay slowly while bills are due now", "Every sale is paid immediately and costs are lower", "It has no obligations", "Cash timing never matters"], "Customers pay slowly while bills are due now", "Profit is an accounting result; cash shortages arise when receipts and payments occur at different times."),
      q("finance", "Accounts receivable represents:", ["Amounts customers owe the business", "Amounts the business owes suppliers", "Cash already deposited", "Owner withdrawals"], "Amounts customers owe the business", "Accounts receivable is an asset created by credit sales that have not yet been collected."),
      q("finance", "A product costs $36 and sells for $60. What is gross profit per unit?", ["$18", "$24", "$36", "$96"], "$24", "Gross profit per unit is selling price minus product cost: $60 − $36 = $24."),
      q("finance", "Which action most directly improves short-term liquidity?", ["Collect overdue receivables faster", "Buy unnecessary long-term equipment with cash", "Extend every customer deadline", "Ignore the cash forecast"], "Collect overdue receivables faster", "Faster collection converts receivables into cash that can meet near-term obligations." )
    ]
  },
  {
    id: "mastery", title: "Mastery Mock", subtitle: "Second full simulation", minutes: 35, feedback: false,
    description: "A completely new mixed exam set with feedback held until final submission.",
    questions: [
      q("entrepreneur", "Which founder is best prepared to manage entrepreneurial uncertainty?", ["One who assumes the forecast cannot change", "One who builds reserves, tests assumptions, and plans contingencies", "One who spends all cash before launch", "One who refuses to track results"], "One who builds reserves, tests assumptions, and plans contingencies", "Preparation reduces exposure while preserving the ability to act when conditions change."),
      q("entrepreneur", "A person wants proven procedures and brand recognition but accepts fees and operating restrictions. Which path fits best?", ["Franchise ownership", "Inventing a new industry", "Unlicensed operation", "Passive employment"], "Franchise ownership", "The tradeoff in franchising is established support and identity in exchange for cost and reduced independence."),
      q("entrepreneur", "Which outcome is most clearly a potential reward of business ownership?", ["Guaranteed market share", "The ability to build equity in an asset", "Freedom from responsibility", "Elimination of competition"], "The ability to build equity in an asset", "A successful owner may build an asset with sale or income value, but no result is guaranteed."),
      q("opportunity", "A survey question asks, “You would definitely buy our amazing product, wouldn't you?” What is wrong with it?", ["It is a leading question", "It is secondary research", "It measures actual purchase behavior", "It has no words"], "It is a leading question", "The wording pushes respondents toward a favorable answer and can bias the findings."),
      q("opportunity", "Which customer segment is most actionable?", ["Everyone everywhere", "Urban cyclists who commute at least three days weekly and need secure storage", "People who like good products", "All adults with no shared need"], "Urban cyclists who commute at least three days weekly and need secure storage", "An actionable segment is specific, reachable, and connected to a defined need."),
      q("opportunity", "A strength in SWOT should be:", ["An internal capability that helps the business compete", "An external law", "A competitor's new product", "A change in inflation"], "An internal capability that helps the business compete", "Strengths are favorable internal factors such as expertise, reputation, assets, or efficient processes."),
      q("startup", "Which section of a business plan explains how customers will be reached and persuaded?", ["Marketing and sales plan", "Employee tax receipt", "Trademark certificate only", "Exit invoice"], "Marketing and sales plan", "This section connects the target market, positioning, channels, pricing, promotion, and sales process."),
      q("startup", "Why might an owner prefer debt over equity when cash flow can support repayment?", ["Debt always has no cost", "Debt can preserve ownership control", "Debt eliminates risk", "Debt requires giving investors voting shares"], "Debt can preserve ownership control", "Debt generally avoids ownership dilution, though it creates interest cost and repayment risk."),
      q("startup", "Which action best supports ethical treatment of customer data?", ["Collect everything without purpose", "Collect only needed data, protect it, and use it as disclosed", "Sell it secretly", "Give all employees unrestricted access"], "Collect only needed data, protect it, and use it as disclosed", "Data stewardship includes purpose limitation, safeguards, controlled access, and honest communication."),
      q("startup", "Which factor should most influence the choice of legal structure?", ["Liability, tax, control, capital needs, and continuity", "Logo color alone", "A competitor's office furniture", "The founder's favorite number"], "Liability, tax, control, capital needs, and continuity", "The best structure depends on several legal, financial, and management considerations and local rules."),
      q("operations", "Which action is an example of segregation of duties?", ["The same employee orders goods and approves payment", "One employee prepares payments and another authorizes them", "No one reviews bank statements", "Everyone shares one login"], "One employee prepares payments and another authorizes them", "Splitting preparation and authorization reduces the chance that one person can create and conceal an improper payment."),
      q("operations", "A logo used to distinguish a company's services should be considered for which protection?", ["Trademark", "Patent", "Copyright of the underlying business idea", "Purchase order"], "Trademark", "Trademarks protect source-identifying names, symbols, logos, and similar branding."),
      q("operations", "Which result most strongly suggests a process needs improvement?", ["Defect rate rises from 2% to 8%", "Employees follow the current checklist", "Customer requirements are met", "Cycle time falls with quality stable"], "Defect rate rises from 2% to 8%", "A rising defect rate is a measurable deterioration in quality that warrants root-cause analysis."),
      q("operations", "A business depends on a component with a 30-day lead time. Why hold safety stock?", ["To eliminate all storage cost", "To absorb reasonable demand or delivery variability", "To avoid forecasting", "To make records inaccurate"], "To absorb reasonable demand or delivery variability", "Safety stock buffers uncertainty, although its benefit must be balanced against carrying cost."),
      q("marketing", "Which promotional message is most likely to be effective?", ["A specific benefit matched to the target customer's problem", "A list of unrelated claims for everyone", "A message with no call to action", "A claim the company cannot support"], "A specific benefit matched to the target customer's problem", "Focused messages are more relevant and persuasive when they connect a credible benefit to a defined need."),
      q("marketing", "A website receives 2,400 qualified visits and 96 purchases. What is the purchase conversion rate?", ["2%", "4%", "24%", "40%"], "4%", "Conversion rate is 96 ÷ 2,400 = 0.04, or 4%."),
      q("marketing", "Which customer complaint response best protects long-term trust?", ["Acknowledge the issue, investigate, communicate honestly, and provide a fair remedy", "Delete every complaint", "Blame the customer immediately", "Promise results outside company control"], "Acknowledge the issue, investigate, communicate honestly, and provide a fair remedy", "Responsive, truthful problem solving can restore trust while giving the business information to prevent recurrence."),
      q("finance", "Opening cash is $12,000. Expected receipts are $28,000 and expected payments are $35,000. What is projected ending cash?", ["$5,000", "$7,000", "$23,000", "$75,000"], "$5,000", "Ending cash is opening cash plus receipts minus payments: 12,000 + 28,000 − 35,000 = 5,000."),
      q("finance", "A business has current assets of $50,000 and current liabilities of $30,000. Its working capital is:", ["$20,000", "$30,000", "$50,000", "$80,000"], "$20,000", "Working capital equals current assets minus current liabilities: $50,000 − $30,000 = $20,000."),
      q("finance", "A service sells for $150, variable cost is $60, and fixed costs are $18,000. What revenue is earned at break-even?", ["$18,000", "$27,000", "$30,000", "$45,000"], "$30,000", "Contribution margin is $90, so break-even volume is 200 services. At $150 each, break-even revenue is $30,000.")
    ]
  }
];

const FLASHCARDS = [
  ["entrepreneur", "Internal locus of control", "The belief that your actions and decisions can influence results."],
  ["entrepreneur", "Calculated risk", "A risk taken after estimating probability, downside, potential return, and ways to limit loss."],
  ["entrepreneur", "Self-assessment", "A review of personal skills, motivations, resources, goals, and risk tolerance."],
  ["entrepreneur", "Franchise", "The right to operate using another company's brand and system in exchange for fees and compliance."],
  ["entrepreneur", "Buying an existing business", "Offers existing operations and customers, but requires due diligence for hidden liabilities."],
  ["entrepreneur", "Entrepreneurial adaptability", "Changing the approach when evidence shifts while keeping the customer problem in focus."],
  ["entrepreneur", "Opportunity cost", "The value of the best alternative given up when a choice is made."],
  ["entrepreneur", "Bootstrapping", "Starting or growing with the founder's own resources and operating revenue instead of major outside funding."],
  ["entrepreneur", "Due diligence", "A careful review of finances, contracts, operations, liabilities, customers, and risks before a purchase or investment."],
  ["entrepreneur", "Entrepreneurial resilience", "Recovering, learning, and continuing productively after setbacks."],
  ["entrepreneur", "Autonomy", "The benefit of having greater control over business goals, methods, and decisions."],
  ["entrepreneur", "Risk tolerance", "The amount and type of uncertainty or potential loss a person is willing and able to accept."],
  ["opportunity", "Business opportunity", "A feasible solution to a real customer problem with enough sustainable demand."],
  ["opportunity", "Value proposition", "A concise promise of the benefit delivered, for whom, and why it is better or different."],
  ["opportunity", "Primary research", "New data collected directly, such as interviews, surveys, observation, or experiments."],
  ["opportunity", "Secondary research", "Existing information such as industry reports, census data, articles, and published studies."],
  ["opportunity", "Market segmentation", "Dividing a market into meaningful groups with similar needs or traits."],
  ["opportunity", "SWOT", "Strengths and weaknesses are internal; opportunities and threats are external."],
  ["opportunity", "Customer persona", "A research-based profile representing a target customer's goals, behaviors, needs, and constraints."],
  ["opportunity", "Demographic segmentation", "Grouping people by measurable traits such as age, income, occupation, education, or family status."],
  ["opportunity", "Geographic segmentation", "Grouping customers by country, region, climate, city, or distance from a location."],
  ["opportunity", "Behavioral segmentation", "Grouping customers by usage, loyalty, purchase occasion, readiness, or benefits sought."],
  ["opportunity", "Competitive advantage", "A capability or benefit that creates superior customer value and is difficult for rivals to match."],
  ["opportunity", "Minimum viable product", "The smallest usable version that can test key assumptions with real customers."],
  ["startup", "Executive summary", "The concise overview of the business plan: concept, market, advantage, team, and key financial need."],
  ["startup", "Sole proprietorship", "One owner, simple formation, direct control, and usually unlimited personal liability."],
  ["startup", "Limited liability", "Legal protection that generally limits an owner's loss to their investment, subject to applicable rules."],
  ["startup", "Debt financing", "Borrowed money that generally must be repaid with interest and does not usually transfer ownership."],
  ["startup", "Equity financing", "Capital exchanged for an ownership share and a claim on future value."],
  ["startup", "Exit strategy", "A planned path for the owner to transfer, sell, succeed, merge, or close the business."],
  ["startup", "Business model", "The system for creating, delivering, and capturing value, including customers, resources, costs, and revenue."],
  ["startup", "Startup costs", "One-time or pre-opening costs needed to begin operations, such as equipment, deposits, and initial inventory."],
  ["startup", "Working capital", "Short-term operating resources available to cover everyday obligations and timing gaps."],
  ["startup", "Licenses and permits", "Official approvals required for particular activities, locations, professions, products, or industries."],
  ["startup", "Partnership agreement", "A document defining contributions, ownership, authority, profit sharing, dispute handling, and partner exits."],
  ["startup", "Social responsibility", "Considering how business decisions affect customers, employees, communities, and the environment."],
  ["operations", "Standard operating procedure", "A written, repeatable method for completing a task consistently and safely."],
  ["operations", "Segregation of duties", "Separating authorization, custody, recordkeeping, and review to reduce error and fraud."],
  ["operations", "Trademark", "Protects brand source identifiers such as names, logos, and slogans."],
  ["operations", "Patent", "May protect a qualifying new and useful invention or process for a limited period."],
  ["operations", "Copyright", "Protects original creative expression, not the underlying fact or idea."],
  ["operations", "Supply chain", "The connected flow of materials, services, information, and products from suppliers to customers."],
  ["operations", "Division of labor", "Splitting work into specialized tasks to improve skill, speed, and accountability."],
  ["operations", "Internal control", "A policy or procedure that protects assets, supports reliable records, and reduces error or fraud."],
  ["operations", "Trade secret", "Valuable confidential business information protected through reasonable efforts to keep it secret."],
  ["operations", "Personnel records", "Secure documentation of hiring, pay, performance, training, benefits, and required employment information."],
  ["operations", "Tax compliance", "Registering, collecting, reporting, filing, and paying required taxes accurately and on time."],
  ["operations", "Growth milestone", "A specific, measurable, time-bound target used to track progress toward expansion."],
  ["marketing", "Four Ps", "Product, price, place, and promotion — the coordinated marketing mix."],
  ["marketing", "Positioning", "The distinctive place a brand or offer aims to occupy in the target customer's mind."],
  ["marketing", "Consultative selling", "Discovering needs through questions and listening, then recommending a suitable solution."],
  ["marketing", "Customer acquisition cost", "Total sales and marketing cost to gain new customers divided by customers acquired."],
  ["marketing", "Customer lifetime value", "Estimated value a customer relationship contributes over its duration."],
  ["marketing", "Active listening", "Focusing, clarifying, paraphrasing, and confirming before responding."],
  ["marketing", "Sales funnel", "The stages that move a prospect from awareness and interest toward evaluation and purchase."],
  ["marketing", "Lead", "A person or organization that has shown potential interest and may become a customer."],
  ["marketing", "Conversion rate", "The percentage of people who complete a desired action, such as purchasing or booking."],
  ["marketing", "Customer acquisition cost", "Total sales and marketing spending divided by the number of new customers gained."],
  ["marketing", "Churn rate", "The percentage of customers who stop using or buying during a defined period."],
  ["marketing", "Handling objections", "Clarifying a buyer's concern, responding with relevant evidence, and confirming whether it is resolved."],
  ["finance", "Income statement", "Revenue minus expenses over a period, showing profit or loss."],
  ["finance", "Balance sheet", "Assets, liabilities, and owner's equity at a point in time."],
  ["finance", "Cash flow statement", "Cash received and cash paid through operating, investing, and financing activities."],
  ["finance", "Contribution margin", "Selling price minus variable cost per unit; the amount available for fixed costs and profit."],
  ["finance", "Break-even units", "Fixed costs divided by contribution margin per unit."],
  ["finance", "Cash flow budget", "A forecast of cash inflows, outflows, timing, and expected cash balance."],
  ["finance", "Fixed cost", "A cost that stays broadly unchanged within a relevant activity range, such as monthly rent."],
  ["finance", "Variable cost", "A cost that changes with the number of units produced or sold, such as direct materials."],
  ["finance", "Gross profit", "Revenue minus cost of goods sold, before operating expenses, interest, and tax."],
  ["finance", "Net profit", "The amount remaining after all applicable expenses are deducted from revenue."],
  ["finance", "Liquidity", "The ability to meet short-term obligations with cash or assets readily convertible to cash."],
  ["finance", "Creditworthiness", "A lender's assessment of the likelihood that a borrower will repay as agreed."],
];

function makeVocabTest(id, title, subtitle, offset) {
  const cards = FLASHCARDS.slice(offset, offset + 24);
  return {
    id, title, subtitle, minutes: 25, feedback: true,
    description: "Definition-to-term questions drawn from the complete mastery deck, with feedback after every answer.",
    questions: cards.map((card, i) => {
      const [domain, term, definition] = card;
      const choices = [term, cards[(i + 5) % cards.length][1], cards[(i + 11) % cards.length][1], cards[(i + 17) % cards.length][1]];
      return q(domain, `Which vocabulary term best matches this definition: “${definition}”`, choices, term, `${term}: ${definition}`);
    })
  };
}

const VOCAB_TESTS = [
  makeVocabTest("vocab-founders", "Vocabulary I", "Entrepreneur & opportunity terms", 0),
  makeVocabTest("vocab-launch", "Vocabulary II", "Startup & operations terms", 24),
  makeVocabTest("vocab-market", "Vocabulary III", "Marketing & finance terms", 48)
];

const EXTRA_PRACTICE_TESTS = [
  {
    id: "cert-practice-a", title: "Certification Practice A", subtitle: "GMetrix-style mixed review", minutes: 35, feedback: false,
    description: "Original scenario questions modeled on the short, decision-focused format of the course practice assessments.",
    questions: [
      q("entrepreneur", "An owner wants immediate customers and operating records but can accept the risk of inherited problems. Which entry path fits best?", ["Buy an existing business after due diligence", "Create a business with no research", "Purchase stocks only", "Become a customer"], "Buy an existing business after due diligence", "An acquisition can provide customers, systems, and history, but due diligence is needed to uncover liabilities and weak performance."),
      q("entrepreneur", "Which statement describes the central tradeoff of franchise ownership?", ["Brand support in exchange for fees and operating limits", "Unlimited freedom with no costs", "Guaranteed profit in exchange for taxes", "No training in exchange for ownership"], "Brand support in exchange for fees and operating limits", "Franchisees gain a tested identity and system while accepting royalties, rules, and less independence."),
      q("entrepreneur", "A founder is creative and persistent but lacks bookkeeping knowledge. What should the founder do?", ["Add training or qualified financial support", "Ignore all records", "Avoid collecting revenue", "Assume creativity replaces accounting"], "Add training or qualified financial support", "Self-assessment should lead to skill development or the addition of complementary expertise."),
      q("opportunity", "Which evidence most strongly supports demand for a proposed subscription?", ["Target customers complete paid trial sign-ups", "The founder likes the idea", "A logo receives compliments", "A supplier sends a catalog"], "Target customers complete paid trial sign-ups", "Real purchase behavior from the target market is stronger evidence than opinions or branding activity."),
      q("opportunity", "A company groups buyers by how often they purchase and the benefits they seek. Which segmentation method is being used?", ["Behavioral", "Geographic", "Demographic", "Legal"], "Behavioral", "Behavioral segmentation uses purchasing, usage, loyalty, readiness, or benefit patterns."),
      q("opportunity", "Which value proposition is most persuasive?", ["Same-day bookkeeping cleanup for small retailers who need accurate month-end reports", "We are a business", "We offer quality", "Our founder works hard"], "Same-day bookkeeping cleanup for small retailers who need accurate month-end reports", "A strong value proposition identifies the customer, benefit, and problem solved."),
      q("startup", "A lender asks how the company will attract customers and generate sales. Which plan section answers the question?", ["Marketing and sales plan", "Title page", "License receipt", "Owner biography only"], "Marketing and sales plan", "This section explains the target market, positioning, channels, promotion, pricing, and selling approach."),
      q("startup", "Equipment costs $22,000, deposits cost $4,000, inventory costs $9,000, and working capital needs are $15,000. What total financing is required?", ["$35,000", "$41,000", "$46,000", "$50,000"], "$50,000", "Total need is 22,000 + 4,000 + 9,000 + 15,000 = 50,000."),
      q("startup", "Which information is most important to a potential equity investor?", ["Market opportunity, team, business model, risk, and growth potential", "Only the company colors", "Only the owner's hobbies", "A guarantee of zero risk"], "Market opportunity, team, business model, risk, and growth potential", "Equity investors evaluate the opportunity, execution ability, economics, risk, and potential return."),
      q("startup", "Two owners want to protect personal assets and define how decisions and profits are shared. What should they consider?", ["An appropriate limited-liability structure and operating agreement", "An undocumented handshake only", "A customer survey instead of legal formation", "No separate business records"], "An appropriate limited-liability structure and operating agreement", "Structure and written governance address liability, authority, ownership, and distributions; local professional advice may be needed."),
      q("operations", "Which employee document most directly clarifies duties and reporting relationships?", ["Job description", "Customer invoice", "Trademark filing", "Sales forecast"], "Job description", "A job description defines responsibilities, qualifications, authority, and supervision."),
      q("operations", "A team performs the same refund differently each time. What should management create first?", ["A documented standard operating procedure", "A second company name", "A new customer segment", "An equity offering"], "A documented standard operating procedure", "An SOP creates a repeatable method that supports training, control, and consistent service."),
      q("operations", "Which protection is most relevant to a distinctive product brand name?", ["Trademark", "Patent", "Trade credit", "Accounts receivable"], "Trademark", "Trademarks protect source identifiers such as names, logos, and slogans."),
      q("operations", "A sole supplier repeatedly ships late. Which response best protects operations?", ["Track performance, require improvement, and approve a backup supplier", "Stop measuring delivery", "Promise customers faster delivery", "Increase dependence on the supplier"], "Track performance, require improvement, and approve a backup supplier", "Performance management and alternate sourcing reduce disruption risk."),
      q("marketing", "A company wants a short-term increase in unit sales without permanently changing the product. Which tactic is most suitable?", ["A limited promotional offer to the target segment", "Remove all communication", "Change the legal structure", "Stop serving existing customers"], "A limited promotional offer to the target segment", "A focused promotion can create urgency and trial while preserving the core offering."),
      q("marketing", "A reliable customer reports a service failure. Which response best supports retention?", ["Acknowledge it, correct it fairly, and follow up", "Blame the customer", "Delete the complaint", "Avoid future contact"], "Acknowledge it, correct it fairly, and follow up", "Service recovery can restore trust when the business responds honestly and resolves the problem."),
      q("marketing", "During a sales conversation, what should happen before recommending a solution?", ["Ask questions and confirm the customer's need", "Quote the highest price immediately", "Criticize competitors", "Promise every possible result"], "Ask questions and confirm the customer's need", "Consultative selling starts with discovery and active listening."),
      q("finance", "A product costs $28 per unit, sells for $45, and customers see no meaningful difference from competitors charging $39. What needs the closest review?", ["Price, customer value, and competitive positioning", "Only the company name", "Only fixed assets", "The employee dress code"], "Price, customer value, and competitive positioning", "Price must reflect cost, perceived value, positioning, demand, and competitive alternatives."),
      q("finance", "Monthly fixed costs are $14,000. Price is $90 and variable cost is $40. What is break-even volume?", ["140 units", "200 units", "280 units", "350 units"], "280 units", "Contribution margin is $50; 14,000 ÷ 50 = 280 units."),
      q("finance", "A profitable company cannot pay payroll because customers have not yet paid invoices. Which problem is this?", ["Cash-flow timing", "Trademark dilution", "Market segmentation", "Product positioning"], "Cash-flow timing", "Profit does not guarantee available cash when receipts arrive after obligations are due.")
    ]
  },
  {
    id: "cert-practice-b", title: "Certification Practice B", subtitle: "Final GMetrix-style simulation", minutes: 35, feedback: false,
    description: "A second original mixed simulation emphasizing the decisions and calculations used throughout the course assessments.",
    questions: [
      q("entrepreneur", "Which action best demonstrates calculated entrepreneurial risk?", ["Test demand, estimate losses, and set a spending limit", "Spend every available dollar immediately", "Ignore competitor activity", "Rely only on optimism"], "Test demand, estimate losses, and set a spending limit", "Calculated risk combines evidence, potential return, downside analysis, and limits on exposure."),
      q("entrepreneur", "Why might an entrepreneur start a new business instead of buying one?", ["To design the concept and culture from the beginning", "To receive guaranteed customers", "To eliminate startup work", "To avoid every market risk"], "To design the concept and culture from the beginning", "Starting from scratch offers greater design freedom but lacks the operating history and existing customers of an acquisition."),
      q("opportunity", "A competitor is inexpensive, but customers complain about slow response. What opportunity does this reveal?", ["Differentiate through faster service", "Copy the slow response", "Target nobody", "Remove service entirely"], "Differentiate through faster service", "A consistent weakness in current alternatives can become a meaningful value proposition."),
      q("opportunity", "Which research activity is primary research?", ["Interviewing prospective customers", "Reading an existing industry forecast", "Using census data", "Reviewing a published trade report"], "Interviewing prospective customers", "Primary data is collected directly for the current business question."),
      q("opportunity", "Why is a customer persona useful?", ["It helps align product and communication with a target customer's needs", "It guarantees every person will buy", "It replaces financial records", "It determines tax rates"], "It helps align product and communication with a target customer's needs", "A research-based persona makes the target customer's goals, behavior, and constraints concrete."),
      q("startup", "A founder wants capital without scheduled loan payments but accepts sharing ownership. Which source fits?", ["Equity investment", "Bank debt", "Supplier invoice", "Late tax payment"], "Equity investment", "Equity does not normally require scheduled repayment, but investors receive an ownership claim."),
      q("startup", "Which factor is most important when choosing a legal structure?", ["Liability, control, tax, financing, and continuity needs", "The color of the website", "The number of competitors only", "The owner's favorite abbreviation"], "Liability, control, tax, financing, and continuity needs", "Structure affects several legal and financial dimensions, and local rules differ."),
      q("startup", "Before signing a lease for a childcare center, the owner should verify:", ["Zoning, licensing, safety, and occupancy requirements", "Only internet speed", "That competitors approve", "That no insurance is needed"], "Zoning, licensing, safety, and occupancy requirements", "The location and operation must satisfy the rules applicable to the activity."),
      q("startup", "A company made a misleading claim and lost customer trust. Which response offers the best chance of recovery?", ["Correct the claim, accept responsibility, provide evidence, and repair harm", "Delete criticism without responding", "Repeat the claim more loudly", "Blame employees publicly"], "Correct the claim, accept responsibility, provide evidence, and repair harm", "Transparent correction and fair remediation are central to rebuilding trust."),
      q("startup", "Which is a legitimate exit strategy?", ["Sell to a strategic buyer", "Stop keeping records", "Ignore succession", "Avoid training managers"], "Sell to a strategic buyer", "A planned sale is one of several exits, alongside succession, merger, management buyout, or orderly closure."),
      q("operations", "How does division of labor commonly improve performance?", ["Workers specialize in defined tasks", "Every worker repeats every role", "No one owns a process", "All communication stops"], "Workers specialize in defined tasks", "Specialization develops speed and skill, while coordination connects the separate tasks."),
      q("operations", "A business collects payroll taxes from wages. What must it do?", ["Record and remit them according to applicable rules", "Treat them as owner profit", "Hide them from records", "Return them as customer discounts"], "Record and remit them according to applicable rules", "Withheld taxes create reporting and remittance obligations."),
      q("operations", "Which project supports both sustainability and operating efficiency?", ["Reducing scrap per finished unit", "Increasing avoidable waste", "Overproducing obsolete inventory", "Removing energy measurements"], "Reducing scrap per finished unit", "Lower material waste can reduce cost and environmental impact simultaneously."),
      q("operations", "Which is the strongest growth milestone?", ["Reach $25,000 monthly recurring revenue by December with churn below 5%", "Grow someday", "Become popular", "Try more activities"], "Reach $25,000 monthly recurring revenue by December with churn below 5%", "A useful milestone is specific, measurable, time-bound, and tied to business health."),
      q("marketing", "A company begins selling through independent retailers. Which marketing-mix element changed most directly?", ["Place", "Promotion", "Product name", "Payroll"], "Place", "Place covers distribution and the channels used to reach customers."),
      q("marketing", "A salesperson recommends a less expensive plan because it better fits the buyer's needs. What approach is this?", ["Consultative selling", "Predatory pricing", "Mass production", "Tax planning"], "Consultative selling", "Consultative selling prioritizes a suitable solution and long-term customer value."),
      q("marketing", "Sales and marketing cost $8,400 and generate 140 new customers. What is acquisition cost per customer?", ["$40", "$60", "$84", "$140"], "$60", "Customer acquisition cost is 8,400 ÷ 140 = $60."),
      q("finance", "Assets are $140,000 and liabilities are $65,000. What is owner's equity?", ["$65,000", "$75,000", "$140,000", "$205,000"], "$75,000", "Equity equals assets minus liabilities: 140,000 − 65,000 = 75,000."),
      q("finance", "Revenue is $210,000, cost of goods sold is $115,000, and operating expenses are $72,000. What is operating profit before interest and tax?", ["$23,000", "$72,000", "$95,000", "$138,000"], "$23,000", "210,000 − 115,000 − 72,000 = 23,000."),
      q("finance", "Which behavior best supports a strong credit rating?", ["Pay on time, control balances, and keep accurate records", "Miss due dates regularly", "Maximize every credit line", "Mix undocumented personal and business debt"], "Pay on time, control balances, and keep accurate records", "Reliable payment history and responsible borrowing demonstrate creditworthiness.")
    ]
  }
];

TESTS.push(...VOCAB_TESTS, ...EXTRA_PRACTICE_TESTS);

function buildFullLengthQuestions() {
  const quotas = { entrepreneur: 7, opportunity: 7, startup: 8, operations: 8, marketing: 7, finance: 8 };
  const pool = TESTS
    .filter(test => !test.id.startsWith("vocab-") && !test.id.startsWith("full-length"))
    .flatMap(test => test.questions);
  const balanced = Object.entries(quotas).flatMap(([domain, count]) =>
    shuffled(pool.filter(item => item.domain === domain)).slice(0, count)
  );
  return shuffled(balanced);
}

TESTS.push({
  id: "full-length",
  title: "Full-Length Certification Simulation A",
  subtitle: "45 questions · official exam timing",
  minutes: 50,
  feedback: false,
  description: "A fresh, domain-balanced 45-question set on every attempt. Answers and explanations appear only after submission.",
  questions: buildFullLengthQuestions()
});

TESTS.push({
  id: "full-length-b",
  title: "Full-Length Certification Simulation B",
  subtitle: "45 questions · second full rehearsal",
  minutes: 50,
  feedback: false,
  description: "A separate randomized, domain-balanced 45-question exam. Answers and explanations appear only after submission.",
  questions: buildFullLengthQuestions()
});

const SWOT_CONCEPTS_MATH_QUESTIONS = [
  // SWOT analysis: 8 of 40 questions (20%).
  q("opportunity", "A bakery has a highly skilled decorating team that competitors cannot easily copy. In a SWOT analysis, this is a:", ["Strength", "Weakness", "Opportunity", "Threat"], "Strength", "The skilled team is a favorable internal capability, so it is a strength."),
  q("opportunity", "A city announces a new grant for businesses that reduce packaging waste. For an eligible startup, the grant is a:", ["Strength", "Weakness", "Opportunity", "Threat"], "Opportunity", "The grant is a favorable external development the startup may be able to use."),
  q("opportunity", "A retailer's point-of-sale system is outdated and causes frequent checkout delays. In SWOT, this is a:", ["Strength", "Weakness", "Opportunity", "Threat"], "Weakness", "The outdated system is an unfavorable internal condition the business can work to improve."),
  q("opportunity", "A well-funded competitor plans to open across the street next month. In SWOT, this is most directly a:", ["Strength", "Weakness", "Opportunity", "Threat"], "Threat", "A new competitor is an unfavorable external condition that may reduce sales or market share."),
  q("opportunity", "A repair shop has a strong reputation for speed, and local demand for same-day repairs is rising. Which strategy best connects the SWOT factors?", ["Use the speed reputation to capture the growing demand", "Stop advertising speed", "Treat rising demand as an internal weakness", "Replace trained technicians before expanding"], "Use the speed reputation to capture the growing demand", "The strategy uses an internal strength to pursue an external opportunity."),
  q("opportunity", "Which pair contains one internal factor followed by one external factor?", ["Employee expertise; changing customer preferences", "New regulation; rising interest rates", "Outdated equipment; weak bookkeeping controls", "Population growth; a new competitor"], "Employee expertise; changing customer preferences", "Employee expertise is internal, while changing customer preferences occur outside the business."),
  q("opportunity", "Customer research shows rapid growth in demand for allergen-free snacks. For a snack company considering that market, this finding is a:", ["Strength", "Weakness", "Opportunity", "Threat"], "Opportunity", "Growing demand is a favorable market condition outside the company."),
  q("opportunity", "A manufacturer relies on one supplier and has no approved backup. Which SWOT classification best fits the lack of supplier alternatives?", ["Strength", "Weakness", "Opportunity", "Threat"], "Weakness", "The company's own sourcing arrangement is an internal weakness. A separate event such as the supplier closing would be an external threat."),

  // Course concepts: 12 of 40 questions (30%).
  q("entrepreneur", "What is the main purpose of an entrepreneurial self-assessment?", ["Identify strengths, skill gaps, goals, and risk tolerance", "Guarantee that the venture will succeed", "Replace customer research", "Determine the business tax rate"], "Identify strengths, skill gaps, goals, and risk tolerance", "Self-assessment helps a founder decide whether the role fits and where training or complementary support is needed."),
  q("opportunity", "Which statement is the strongest value proposition?", ["Weekly prepared meals for busy nurses, delivered before their first shift", "We opened last year", "We sell several products", "Our company works hard"], "Weekly prepared meals for busy nurses, delivered before their first shift", "A strong value proposition identifies a target customer and a specific, useful benefit."),
  q("opportunity", "Which activity produces primary market research?", ["Interviewing prospective customers", "Reading a published industry report", "Reviewing census data", "Studying a competitor's annual report"], "Interviewing prospective customers", "Primary research is collected directly for the current decision."),
  q("startup", "Which section of a business plan gives a brief overview of the concept, market, advantage, team, and financial request?", ["Executive summary", "Employee handbook", "Purchase order", "Job description"], "Executive summary", "The executive summary presents the plan's essential points so a reader can quickly understand the venture."),
  q("startup", "A founder wants funding without scheduled repayments but will share ownership and future gains. Which source best fits?", ["Equity investment", "Bank loan", "Trade credit", "Equipment lease"], "Equity investment", "Equity investors provide capital for an ownership interest rather than scheduled principal and interest payments."),
  q("startup", "Why is a written partnership agreement valuable?", ["It defines contributions, authority, profit sharing, disputes, and exits", "It removes every business risk", "It replaces all licenses", "It guarantees equal effort forever"], "It defines contributions, authority, profit sharing, disputes, and exits", "The agreement reduces ambiguity about how the partners will own and operate the business."),
  q("operations", "What is the main purpose of a standard operating procedure?", ["Document a repeatable method for completing a task", "Make each employee invent a different process", "Replace all training", "Prevent future process improvement"], "Document a repeatable method for completing a task", "An SOP supports consistent work, training, quality control, and accountability."),
  q("operations", "Which intellectual property protection is most relevant to a distinctive business name and logo?", ["Trademark", "Patent", "Copyright on the business idea", "Trade credit"], "Trademark", "Trademarks protect source identifiers such as names, logos, and slogans."),
  q("marketing", "A business begins selling through grocery stores in addition to its website. Which element of the marketing mix changed most directly?", ["Place", "Price", "Promotion", "Product"], "Place", "Place refers to distribution channels and where customers can obtain the product."),
  q("marketing", "A salesperson asks diagnostic questions and recommends the option that best fits the buyer's needs. This is:", ["Consultative selling", "Mass production", "Market skimming", "Financial forecasting"], "Consultative selling", "Consultative selling begins with discovery and matches the solution to the customer's situation."),
  q("finance", "A profitable company cannot pay a bill because customers will not pay their invoices until next month. What problem is the company facing?", ["Cash-flow timing", "Product positioning", "Trademark infringement", "Market segmentation"], "Cash-flow timing", "Accounting profit does not guarantee that enough cash is available when payments are due."),
  q("startup", "A product claim is technically legal but likely to mislead customers. What is the strongest ethical action?", ["Clarify the claim and support it with evidence", "Use it until a regulator objects", "Hide the limitation in tiny print", "Ask employees not to discuss it"], "Clarify the claim and support it with evidence", "Ethical marketing communicates material facts clearly and supports claims with evidence."),

  // Business mathematics: 20 of 40 questions (50%).
  q("startup", "Equipment costs $18,500, opening inventory is $6,200, deposits are $2,300, and initial working capital is $13,000. What is the total startup funding need?", ["$27,000", "$34,700", "$40,000", "$42,300"], "$40,000", "Add every startup requirement: 18,500 + 6,200 + 2,300 + 13,000 = 40,000."),
  q("finance", "A product sells for $72 and has a variable cost of $44. What is its contribution margin per unit?", ["$28", "$44", "$72", "$116"], "$28", "Contribution margin per unit equals selling price minus variable cost: 72 - 44 = 28."),
  q("finance", "Monthly fixed costs are $21,000. A service sells for $110 and has a $50 variable cost. How many services must be sold to break even?", ["191", "300", "350", "420"], "350", "Contribution margin is 110 - 50 = 60. Break-even volume is 21,000 / 60 = 350 services."),
  q("finance", "A product sells for $80, variable cost is $48, and fixed costs are $16,000. What sales revenue is earned at break-even?", ["$16,000", "$32,000", "$40,000", "$64,000"], "$40,000", "Contribution margin is 32, so break-even volume is 16,000 / 32 = 500 units. Revenue is 500 x 80 = 40,000."),
  q("finance", "A store has sales revenue of $185,000 and cost of goods sold of $111,000. What is gross profit?", ["$74,000", "$111,000", "$185,000", "$296,000"], "$74,000", "Gross profit equals revenue minus cost of goods sold: 185,000 - 111,000 = 74,000."),
  q("finance", "Sales are $250,000 and gross profit is $100,000. What is the gross profit margin?", ["25%", "40%", "60%", "150%"], "40%", "Gross margin equals gross profit divided by sales: 100,000 / 250,000 = 40%."),
  q("finance", "Revenue is $160,000, cost of goods sold is $88,000, and all other expenses total $54,000. What is net profit?", ["$18,000", "$54,000", "$72,000", "$106,000"], "$18,000", "Net profit is 160,000 - 88,000 - 54,000 = 18,000."),
  q("finance", "An item costs $50 and sells for $65. What is the markup percentage based on cost?", ["15%", "23%", "30%", "76.9%"], "30%", "Markup is 65 - 50 = 15. Markup based on cost is 15 / 50 = 30%."),
  q("finance", "A retailer wants a 25% markup on an item that costs $80. What selling price should it use?", ["$85", "$96", "$100", "$105"], "$100", "A 25% markup on cost is 80 x 0.25 = 20, so the selling price is 100."),
  q("marketing", "A campaign costs $9,600 and produces 160 new customers. What is the customer acquisition cost?", ["$40", "$60", "$96", "$160"], "$60", "Customer acquisition cost is campaign cost divided by new customers: 9,600 / 160 = 60."),
  q("marketing", "A landing page receives 2,400 qualified visitors and 144 make a purchase. What is the conversion rate?", ["4%", "6%", "16.7%", "60%"], "6%", "Conversion rate is 144 / 2,400 x 100 = 6%."),
  q("opportunity", "A company sells $360,000 in a market with total annual sales of $4,500,000. What is its market share?", ["4%", "8%", "12.5%", "80%"], "8%", "Market share is company sales divided by total market sales: 360,000 / 4,500,000 = 8%."),
  q("finance", "A $20,000 project produces $26,000 in total proceeds. Using (gain - investment) / investment, what is the return on investment?", ["20%", "30%", "76.9%", "130%"], "30%", "The gain above the investment is 6,000. ROI is 6,000 / 20,000 = 30%."),
  q("finance", "A business borrows $12,000 at 6% simple annual interest for two years. How much total interest will it pay?", ["$720", "$1,200", "$1,440", "$13,440"], "$1,440", "Simple interest is principal x rate x time: 12,000 x 0.06 x 2 = 1,440."),
  q("finance", "A company's assets are $195,000 and liabilities are $83,000. What is owner's equity?", ["$83,000", "$112,000", "$195,000", "$278,000"], "$112,000", "Using assets = liabilities + equity, equity is 195,000 - 83,000 = 112,000."),
  q("finance", "Beginning cash is $14,500. Cash receipts are $38,000 and cash payments are $44,700. What is ending cash?", ["$6,700", "$7,800", "$20,800", "$97,200"], "$7,800", "Ending cash is 14,500 + 38,000 - 44,700 = 7,800."),
  q("finance", "A store buys 300 units at $18 each and sells all of them for $30 each. What is total gross profit?", ["$3,600", "$5,400", "$9,000", "$14,400"], "$3,600", "Gross profit per unit is 30 - 18 = 12. For 300 units, 12 x 300 = 3,600."),
  q("marketing", "A $120 product is discounted by 15%. What is the sale price before tax?", ["$18", "$102", "$105", "$138"], "$102", "The discount is 120 x 0.15 = 18. The sale price is 120 - 18 = 102."),
  q("operations", "Four employees each work 25 hours at $18 per hour. What is the total gross payroll before taxes and benefits?", ["$450", "$1,800", "$2,250", "$4,500"], "$1,800", "Total hours are 4 x 25 = 100. Gross payroll is 100 x 18 = 1,800."),
  q("finance", "A business sells 900 units at $55 each. Variable cost is $31 per unit and fixed costs are $15,000. What is operating profit?", ["$6,600", "$15,000", "$21,600", "$34,500"], "$6,600", "Total contribution is (55 - 31) x 900 = 21,600. Subtract 15,000 fixed costs to get 6,600 profit.")
];

TESTS.push({
  id: "swot-concepts-math",
  title: "SWOT, Concepts & Business Math",
  subtitle: "40 questions · 20% SWOT · 30% concepts · 50% math",
  minutes: 45,
  feedback: false,
  description: "A focused certification-style exam using fresh scenarios modeled on the concepts and calculation patterns in the course practice assessments.",
  questions: SWOT_CONCEPTS_MATH_QUESTIONS
});

const STORAGE_KEY = "esb-study-lab-v1";
let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"results":{},"mastered":[]}');
let activeTest = null;
let timerId = null;
let flashState = { domain: "all", index: 0, flipped: false, order: [] };

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
function domainName(id) { return DOMAINS.find(d => d.id === id)?.name || id; }
function escapeHtml(text) { return String(text).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
function go(view) {
  clearInterval(timerId);
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  if (view === "home") renderHome();
  if (view === "tests") renderTests();
  if (view === "flashcards") renderFlashcards();
  location.hash = view;
  document.querySelector("main").focus();
  scrollTo({ top: 0, behavior: "smooth" });
}

function cloneTemplate(id) {
  const app = document.querySelector("#app");
  app.replaceChildren(document.querySelector(id).content.cloneNode(true));
  return app;
}

function renderHome() {
  const app = cloneTemplate("#home-template");
  document.querySelector("#domain-grid").innerHTML = DOMAINS.map((d, i) => `<article class="domain-card"><span class="number">0${i+1}</span><h3>${d.name}</h3><p>${d.note}</p></article>`).join("");
  const results = Object.values(saved.results);
  const readiness = results.length ? Math.round(results.reduce((s, r) => s + r.best, 0) / results.length) : 0;
  document.querySelector("#readiness-score").textContent = `${readiness}%`;
  document.querySelector("#readiness-ring").style.setProperty("--score", `${readiness * 3.6}deg`);
  document.querySelector("#readiness-label").textContent = readiness >= 80 ? "Strong — target weak domains" : readiness > 0 ? "Keep building" : "Start your first test";
  app.querySelector("[data-action='open-tests']").onclick = () => go("tests");
  app.querySelector("[data-action='open-flashcards']").onclick = () => go("flashcards");
}

function renderTests() {
  cloneTemplate("#tests-template");
  document.querySelector("#test-grid").innerHTML = TESTS.map((test, i) => {
    const result = saved.results[test.id];
    return `<article class="test-card"><span class="test-number">TEST ${String(i+1).padStart(2,"0")}</span><h2>${test.title}</h2><strong>${test.subtitle}</strong><p>${test.description}</p><div class="test-meta"><span class="pill">${test.questions.length} questions</span><span class="pill">${test.minutes} min</span><span class="pill">${test.feedback ? "Guided" : "Exam mode"}</span></div><button class="button primary" data-start="${test.id}">${result ? "Retake test" : "Start test"}</button><span class="test-status">${result ? `Best score: <strong>${result.best}%</strong> · ${result.attempts} attempt${result.attempts === 1 ? "" : "s"}` : "Not attempted"}</span></article>`;
  }).join("");
  document.querySelectorAll("[data-start]").forEach(b => b.onclick = () => startTest(b.dataset.start));
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}

function startTest(id) {
  const baseTest = TESTS.find(t => t.id === id);
  const test = id.startsWith("full-length") ? { ...baseTest, questions: buildFullLengthQuestions() } : baseTest;
  activeTest = { test, index: 0, answers: [], choices: test.questions.map(item => item.choices ? shuffled(item.choices) : []), seconds: test.minutes * 60, locked: false };
  if (test.introduction) return renderTestIntro();
  beginTimedTest();
}

function beginTimedTest() {
  renderQuestion();
  timerId = setInterval(() => {
    activeTest.seconds--;
    updateTimer();
    if (activeTest.seconds <= 0) finishTest();
  }, 1000);
}

function renderTestIntro() {
  const { test } = activeTest;
  document.querySelector("#app").innerHTML = `<section class="quiz-shell"><article class="test-intro"><p class="eyebrow">${escapeHtml(test.title)}</p><h1>Introduction</h1><p class="intro-copy">${escapeHtml(test.introduction)}</p><h2>Directions</h2><ol>${test.directions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ol><div class="test-meta"><span class="pill">${test.questions.length} items</span><span class="pill">${test.minutes} min</span><span class="pill">Mixed format</span></div><div class="quiz-actions"><button class="text-button" id="intro-back">All tests</button><button class="button primary" id="begin-test">Begin assessment</button></div></article></section>`;
  document.querySelector("#intro-back").onclick = () => go("tests");
  document.querySelector("#begin-test").onclick = beginTimedTest;
  scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const { test, index, answers, choices } = activeTest;
  const item = test.questions[index];
  const selected = answers[index];
  let interaction;
  if (item.type === "fill") {
    interaction = `<div class="written-response"><label for="fill-answer">Your answer</label><input id="fill-answer" class="text-answer" type="text" value="${escapeHtml(selected?.choice || "")}" autocomplete="off" ${selected && test.feedback ? "disabled" : ""}><button class="button secondary" id="submit-written" ${selected && test.feedback ? "disabled" : ""}>Check answer</button></div>`;
  } else if (item.type === "matching") {
    const options = shuffled(item.pairs.map(pair => pair[1]));
    interaction = `<div class="matching-grid">${item.pairs.map(([term]) => `<label class="matching-row"><strong>${escapeHtml(term)}</strong><select data-match="${escapeHtml(term)}" ${selected && test.feedback ? "disabled" : ""}><option value="">Choose a definition</option>${options.map(option => `<option value="${escapeHtml(option)}" ${selected?.values?.[term] === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`).join("")}<button class="button secondary" id="submit-matching" ${selected && test.feedback ? "disabled" : ""}>Check matches</button></div>`;
  } else if (item.type === "essay") {
    interaction = `<div class="written-response"><label for="essay-answer">Your response</label><textarea id="essay-answer" class="essay-answer" rows="8" ${selected ? "disabled" : ""}>${escapeHtml(selected?.choice || "")}</textarea><button class="button secondary" id="submit-essay" ${selected ? "disabled" : ""}>Save response</button></div>`;
  } else {
    interaction = `<div class="choices">${choices[index].map((c, n) => `<button class="choice ${selected?.choice === c ? "selected" : ""}" data-choice="${escapeHtml(c)}"><span class="choice-letter">${String.fromCharCode(65+n)}</span><span>${escapeHtml(c)}</span></button>`).join("")}</div>`;
  }
  const app = document.querySelector("#app");
  app.innerHTML = `<section class="quiz-shell"><header class="quiz-head"><div><p class="eyebrow">${escapeHtml(test.title)}</p><h1>Question ${index+1} of ${test.questions.length}</h1></div><span class="timer" id="timer"></span><div class="progress-track"><span style="width:${((index+1)/test.questions.length)*100}%"></span></div></header><article class="question-card"><div class="question-meta"><span>${escapeHtml(domainName(item.domain))}</span><span>${item.type === "essay" ? "Open response" : test.feedback ? "Guided feedback" : "Exam mode"}</span></div><h2>${escapeHtml(item.prompt)}</h2>${interaction}<div id="feedback"></div><div class="quiz-actions"><button class="text-button" id="exit-test">Exit test</button><button class="button primary" id="next-question" ${selected ? "" : "disabled"}>${index === test.questions.length-1 ? "Submit test" : "Next question"}</button></div></article></section>`;
  updateTimer();
  document.querySelectorAll("[data-choice]").forEach(b => b.onclick = () => selectAnswer(b.dataset.choice));
  if (item.type === "fill") document.querySelector("#submit-written").onclick = submitFillAnswer;
  if (item.type === "matching") document.querySelector("#submit-matching").onclick = submitMatchingAnswer;
  if (item.type === "essay") document.querySelector("#submit-essay").onclick = submitEssayAnswer;
  document.querySelector("#next-question").onclick = nextQuestion;
  document.querySelector("#exit-test").onclick = () => { if (confirm("Exit this attempt? Your current answers will not be saved.")) go("tests"); };
  if (selected && test.feedback) showFeedback();
  scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeAnswer(value) { return String(value).trim().toLowerCase().replace(/\s+/g, " "); }

function submitFillAnswer() {
  const value = document.querySelector("#fill-answer").value.trim();
  if (!value) return;
  const item = activeTest.test.questions[activeTest.index];
  const correct = item.answers.some(answer => normalizeAnswer(answer) === normalizeAnswer(value));
  activeTest.answers[activeTest.index] = { choice: value, correct };
  activeTest.locked = activeTest.test.feedback;
  renderQuestion();
}

function submitMatchingAnswer() {
  const item = activeTest.test.questions[activeTest.index];
  const values = {};
  document.querySelectorAll("[data-match]").forEach(select => { values[select.dataset.match] = select.value; });
  if (Object.values(values).some(value => !value)) return;
  const correct = item.pairs.every(([term, definition]) => values[term] === definition);
  const choice = item.pairs.map(([term]) => `${term}: ${values[term]}`).join("; ");
  activeTest.answers[activeTest.index] = { choice, values, correct };
  activeTest.locked = activeTest.test.feedback;
  renderQuestion();
}

function submitEssayAnswer() {
  const value = document.querySelector("#essay-answer").value.trim();
  if (!value) return;
  activeTest.answers[activeTest.index] = { choice: value, correct: null };
  activeTest.locked = true;
  renderQuestion();
}

function selectAnswer(choice) {
  if (activeTest.locked) return;
  const { test, index } = activeTest;
  activeTest.answers[index] = { choice, correct: choice === test.questions[index].answer };
  if (test.feedback) activeTest.locked = true;
  document.querySelectorAll("[data-choice]").forEach(b => {
    b.classList.toggle("selected", b.dataset.choice === choice);
    if (test.feedback) {
      b.disabled = true;
      if (b.dataset.choice === test.questions[index].answer) b.classList.add("correct");
      if (b.dataset.choice === choice && choice !== test.questions[index].answer) b.classList.add("incorrect");
    }
  });
  document.querySelector("#next-question").disabled = false;
  if (test.feedback) showFeedback();
}

function showFeedback() {
  const { test, index, answers } = activeTest;
  const item = test.questions[index];
  const good = answers[index].correct;
  if (item.unscored) {
    document.querySelector("#feedback").innerHTML = `<div class="explanation"><strong>Response saved — review it with this rubric.</strong>${escapeHtml(item.explanation)}</div>`;
  } else {
    document.querySelector("#feedback").innerHTML = `<div class="explanation"><strong>${good ? "Correct." : `Correct answer: ${escapeHtml(item.answer)}`}</strong>${escapeHtml(item.explanation)}</div>`;
  }
}

function nextQuestion() {
  if (!activeTest.answers[activeTest.index]) return;
  if (activeTest.index === activeTest.test.questions.length - 1) return finishTest();
  activeTest.index++;
  activeTest.locked = false;
  renderQuestion();
}

function updateTimer() {
  const timer = document.querySelector("#timer");
  if (!timer || !activeTest) return;
  const m = Math.floor(activeTest.seconds / 60); const s = activeTest.seconds % 60;
  timer.textContent = `${m}:${String(s).padStart(2,"0")}`;
}

function finishTest() {
  clearInterval(timerId);
  const { test, answers } = activeTest;
  const scoredIndexes = test.questions.map((item, i) => ({ item, i })).filter(x => !x.item.unscored).map(x => x.i);
  const correct = scoredIndexes.filter(i => answers[i]?.correct).length;
  const scoredTotal = scoredIndexes.length;
  const score = scoredTotal ? Math.round(correct / scoredTotal * 100) : 0;
  const prior = saved.results[test.id] || { best: 0, attempts: 0 };
  saved.results[test.id] = { best: Math.max(prior.best, score), latest: score, attempts: prior.attempts + 1, date: new Date().toISOString() };
  save();
  renderResults(score, correct, scoredTotal);
}

function renderResults(score, correct, scoredTotal) {
  const { test, answers } = activeTest;
  const domainRows = DOMAINS.map(d => {
    const qs = test.questions.map((item, i) => ({item, i})).filter(x => x.item.domain === d.id && !x.item.unscored);
    const right = qs.filter(x => answers[x.i]?.correct).length;
    const pct = qs.length ? Math.round(right / qs.length * 100) : 0;
    return `<div class="domain-row"><strong>${d.name}</strong><div class="bar"><span style="width:${pct}%"></span></div><span>${pct}%</span></div>`;
  }).join("");
  const missed = test.questions.map((item, i) => ({item, i})).filter(x => !x.item.unscored && !answers[x.i]?.correct);
  const openResponses = test.questions.map((item, i) => ({item, i})).filter(x => x.item.unscored);
  const openReview = openResponses.length ? `<h2>Open-response self-review</h2><div class="review-list">${openResponses.map(({item,i}) => `<article class="review-item"><span class="pill">Not auto-scored</span><h3>${escapeHtml(item.prompt)}</h3><p><strong>Your response:</strong> ${escapeHtml(answers[i]?.choice || "No response")}</p><p><strong>Rubric:</strong> ${escapeHtml(item.explanation)}</p></article>`).join("")}</div>` : "";
  document.querySelector("#app").innerHTML = `<section class="quiz-shell"><div class="results-hero"><p class="eyebrow">${escapeHtml(test.title)} complete</p><div class="score-big">${score}%</div><p>${correct} of ${scoredTotal} auto-scored items correct.${openResponses.length ? " Review the open response separately with its rubric." : score >= 80 ? " Strong result. Review the misses, then keep the weak domains active." : " Use the domain scores below to guide your next review round."}</p></div><h2>Domain performance</h2><div class="domain-results">${domainRows}</div><div class="quiz-actions"><button class="button secondary" id="back-tests">All tests</button><button class="button primary" id="retry-test">Retake this test</button></div><h2>${missed.length ? `Review ${missed.length} missed question${missed.length===1?"":"s"}` : "All auto-scored items correct"}</h2><div class="review-list">${missed.length ? missed.map(({item,i}) => `<article class="review-item"><span class="pill">${domainName(item.domain)}</span><h3>${escapeHtml(item.prompt)}</h3><p><strong>Your answer:</strong> ${escapeHtml(answers[i]?.choice || "No answer")}</p><p><strong>Correct answer:</strong> ${escapeHtml(item.answer)}</p><p>${escapeHtml(item.explanation)}</p></article>`).join("") : `<article class="review-item"><p>You answered all ${scoredTotal} auto-scored items correctly.</p></article>`}</div>${openReview}</section>`;
  document.querySelector("#back-tests").onclick = () => go("tests");
  document.querySelector("#retry-test").onclick = () => startTest(test.id);
  scrollTo({ top: 0, behavior: "smooth" });
}

function filteredCards() { return flashState.order.filter(i => flashState.domain === "all" || FLASHCARDS[i][0] === flashState.domain); }
function renderFlashcards() {
  cloneTemplate("#flashcards-template");
  if (!flashState.order.length) flashState.order = FLASHCARDS.map((_, i) => i);
  const select = document.querySelector("#flash-filter");
  select.innerHTML = `<option value="all">All domains</option>${DOMAINS.map(d => `<option value="${d.id}">${d.name}</option>`).join("")}`;
  select.value = flashState.domain;
  select.onchange = () => { flashState.domain = select.value; flashState.index = 0; flashState.flipped = false; updateCard(); };
  document.querySelector("#shuffle-cards").onclick = () => { flashState.order = shuffled(flashState.order); flashState.index = 0; flashState.flipped = false; updateCard(); };
  document.querySelector("#flashcard").onclick = flipCard;
  document.querySelector("#prev-card").onclick = () => moveCard(-1);
  document.querySelector("#next-card").onclick = () => moveCard(1);
  document.querySelector("#mark-mastered").onclick = () => setMastery(true);
  document.querySelector("#mark-learning").onclick = () => setMastery(false);
  updateCard();
}

function updateCard() {
  const list = filteredCards();
  if (flashState.index >= list.length) flashState.index = 0;
  const sourceIndex = list[flashState.index];
  const [domain, term, definition] = FLASHCARDS[sourceIndex];
  const card = document.querySelector("#flashcard");
  card.classList.toggle("flipped", flashState.flipped);
  document.querySelector("#card-domain").textContent = domainName(domain);
  document.querySelector("#card-label").textContent = flashState.flipped ? "ANSWER" : "QUESTION";
  document.querySelector("#card-content").textContent = flashState.flipped ? definition : term;
  const mastered = saved.mastered.includes(sourceIndex);
  document.querySelector("#mark-mastered").textContent = mastered ? "Mastered ✓" : "Mark mastered";
  document.querySelector("#mastery-count").textContent = `${saved.mastered.length} / ${FLASHCARDS.length} mastered`;
  document.querySelector("#flash-progress").textContent = `Card ${flashState.index+1} of ${list.length}`;
}

function flipCard() { flashState.flipped = !flashState.flipped; updateCard(); }
function moveCard(delta) { const list = filteredCards(); flashState.index = (flashState.index + delta + list.length) % list.length; flashState.flipped = false; updateCard(); }
function setMastery(value) {
  const sourceIndex = filteredCards()[flashState.index];
  saved.mastered = value ? [...new Set([...saved.mastered, sourceIndex])] : saved.mastered.filter(i => i !== sourceIndex);
  save();
  if (value) moveCard(1); else updateCard();
}

document.querySelectorAll(".nav-link").forEach(b => b.onclick = () => go(b.dataset.view));
document.querySelector(".brand").onclick = e => { e.preventDefault(); go("home"); };
document.addEventListener("keydown", e => {
  if (e.code === "Space" && document.querySelector("#flashcard") && !["SELECT","BUTTON"].includes(document.activeElement.tagName)) { e.preventDefault(); flipCard(); }
});
go(["tests","flashcards"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "home");

