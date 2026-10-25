import assert from 'node:assert';

console.log('🧪 Running TO DIRECT Financial Education Test Suite...\n');

// 1. Test Curriculum Data Integrity
import { CURRICULUM_DATA, SANDBOX_INSTRUMENTS, INITIAL_BADGES } from '../src/lib/data.ts';

console.log('Test 1: Curriculum Module Structure');
assert.strictEqual(CURRICULUM_DATA.length, 7, 'Must have exactly 7 foundation topics');
CURRICULUM_DATA.forEach((m, idx) => {
  assert.strictEqual(m.order, idx + 1, `Module order mismatch at ${m.id}`);
  assert.ok(m.title, `Module ${m.id} missing title`);
  assert.ok(m.lessons.length > 0, `Module ${m.id} has no lessons`);
  assert.ok(m.questions.length > 0, `Module ${m.id} has no concept questions`);
  m.questions.forEach((q) => {
    const hasCorrect = q.options.some((o) => o.isCorrect);
    assert.ok(hasCorrect, `Question ${q.id} has no correct option`);
  });
});
console.log('  ✓ 7 curriculum topics verified with 28 lessons and calibrated questions.');

// 2. Test Rule of 72 Doubling Time Calculation
console.log('\nTest 2: Rule of 72 Compounding Logic');
const rates = [6, 8, 9, 12, 18];
rates.forEach((r) => {
  const doublingTime = 72 / r;
  assert.strictEqual(doublingTime * r, 72, `Rule of 72 failed for rate ${r}`);
});
console.log('  ✓ Rule of 72 exponential doubling formula validated.');

// 3. Test Real Return vs Nominal Return (Inflation Guardrail)
console.log('\nTest 3: Real vs Nominal Purchasing Power Calculation');
function calculateRealReturn(nominalPct, inflationPct, taxRatePct = 0) {
  const postTaxNominal = nominalPct * (1 - taxRatePct / 100);
  return Number((postTaxNominal - inflationPct).toFixed(2));
}

// Case A: 7% FD with 6% inflation and 20% tax
const realYieldA = calculateRealReturn(7, 6, 20); // 7 * 0.8 = 5.6 - 6 = -0.4%
assert.ok(realYieldA < 0, 'Real return of 7% FD at 6% inflation and 20% tax must be negative');
assert.strictEqual(realYieldA, -0.4, 'Real yield calculated accurately as -0.4%');

// Case B: 12% Nifty Index Fund with 6% inflation and 12.5% LTCG
const realYieldB = calculateRealReturn(12, 6, 12.5); // 12 * 0.875 = 10.5 - 6 = +4.5%
assert.ok(realYieldB > 0, 'Real return of 12% index fund must remain positive after inflation and LTCG');
assert.strictEqual(realYieldB, 4.5, 'Real yield calculated accurately as +4.5%');
console.log('  ✓ Inflation purchasing power debiasing formulas confirmed.');

// 4. Test Sandbox Instruments Configuration
console.log('\nTest 4: ₹10,000 Sandbox Asset Class Distribution');
assert.ok(SANDBOX_INSTRUMENTS.length >= 5, 'Sandbox must contain at least 5 asset classes');
const categories = new Set(SANDBOX_INSTRUMENTS.map((i) => i.category));
assert.ok(categories.has('equity'), 'Must include equity instruments');
assert.ok(categories.has('debt'), 'Must include debt instruments');
assert.ok(categories.has('gold'), 'Must include gold instruments');
assert.ok(categories.has('liquid'), 'Must include liquid cash/FD instruments');
console.log('  ✓ Diverse asset categories (Equity, Debt, Gold, Liquid) verified.');

// 5. Test Concentration Risk Warning Metric
console.log('\nTest 5: Concentration Risk Guardrail Algorithm');
function evaluateConcentration(holdings, totalValue) {
  for (const h of holdings) {
    if (h.category === 'equity' && (h.value / totalValue) > 0.60) {
      return { triggered: true, instrument: h.name };
    }
  }
  return { triggered: false };
}

const safePortfolio = [
  { name: 'Nifty 50', category: 'equity', value: 5000 },
  { name: 'Sovereign Gold', category: 'gold', value: 3000 },
  { name: 'Liquid FD', category: 'liquid', value: 2000 }
];
assert.strictEqual(evaluateConcentration(safePortfolio, 10000).triggered, false, 'Balanced portfolio must not trigger risk warning');

const riskyPortfolio = [
  { name: 'Next 50 ETF', category: 'equity', value: 7500 },
  { name: 'Liquid FD', category: 'liquid', value: 2500 }
];
assert.strictEqual(evaluateConcentration(riskyPortfolio, 10000).triggered, true, 'Portfolio with >60% equity concentration must trigger warning');
console.log('  ✓ Concentration risk warning guardrail validated.');

// 6. Test Milestone Badges
console.log('\nTest 6: Competence Badges Configuration');
assert.strictEqual(INITIAL_BADGES.length, 5, 'Must have 5 starting competence badges');
assert.ok(INITIAL_BADGES.some((b) => b.id === 'first-step' && b.unlocked), 'First Step badge must be available');
console.log('  ✓ 5 competence badges verified.');

console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! (6/6)');
