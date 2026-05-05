# Graph Report - .  (2026-05-05)

## Corpus Check
- Corpus is ~9,569 words - fits in a single context window. You may not need a graph.

## Summary
- 102 nodes · 53 edges · 57 communities (47 shown, 10 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.82)
- Token cost: 3,700 input · 2,350 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Tax Core Logic|Tax Core Logic]]
- [[_COMMUNITY_Salary Hooks|Salary Hooks]]
- [[_COMMUNITY_Formatting Utilities|Formatting Utilities]]
- [[_COMMUNITY_Project Config|Project Config]]
- [[_COMMUNITY_UI Components|UI Components]]
- [[_COMMUNITY_Application Entry|Application Entry]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]

## God Nodes (most connected - your core abstractions)
1. `HomeScreen` - 6 edges
2. `formatINR()` - 5 edges
3. `BreakdownLineItem()` - 4 edges
4. `calculateTaxResult()` - 4 edges
5. `useSalaryCalculation` - 4 edges
6. `calculateHRAExemption()` - 3 edges
7. `calculateSalaryBreakdown()` - 3 edges
8. `formatIndianNumber()` - 3 edges
9. `SalaryBreakdownScreen()` - 2 edges
10. `MonthlyYearlyToggle()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Project README` --references--> `HomeScreen`  [INFERRED]
  README.md → src/components/HomeScreen.tsx
- `formatWithUnit()` --calls--> `formatINR()`  [INFERRED]
  src/components/salary/SalaryBreakdownCard.tsx → src/lib/utils/formatters.ts
- `BreakdownLineItem()` --calls--> `formatINR()`  [INFERRED]
  src/components/salary/BreakdownLineItem.tsx → src/lib/utils/formatters.ts
- `getRecommendationText()` --calls--> `formatINR()`  [INFERRED]
  src/components/salary/RegimeComparisonCard.tsx → src/lib/utils/formatters.ts
- `HomeScreen` --calls--> `MonthlyYearlyToggle`  [INFERRED]
  src/components/HomeScreen.tsx → src/components/salary/MonthlyYearlyToggle.tsx

## Hyperedges (group relationships)
- **Core Calculation Pipeline** — logic_tax, logic_pf, logic_hra, logic_salary [INFERRED 0.85]

## Communities (57 total, 10 thin omitted)

### Community 0 - "Tax Core Logic"
Cohesion: 0.25
Nodes (8): App Component, BreakdownLineItem, MonthlyYearlyToggle, RegimeToggle, Project README, HomeScreen, Main Entry, CalculatorStore

### Community 1 - "Salary Hooks"
Cohesion: 0.43
Nodes (4): calculateHRAExemption(), calculateSalaryBreakdown(), calculateTax(), calculateTaxResult()

### Community 2 - "Formatting Utilities"
Cohesion: 0.38
Nodes (4): getRecommendationText(), formatIndianNumber(), formatINR(), formatINRCompact()

### Community 3 - "Project Config"
Cohesion: 0.29
Nodes (7): Tax Slabs, useSalaryCalculation, HRA Logic, PF Logic, Salary Components, Tax Logic, Salary Tests

## Knowledge Gaps
- **17 isolated node(s):** `Main Entry`, `Vite Config`, `Tailwind Config`, `BreakdownLineItem`, `MonthlyYearlyToggle` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BreakdownLineItem()` connect `UI Components` to `Formatting Utilities`, `Application Entry`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `formatINR()` connect `Formatting Utilities` to `UI Components`, `Application Entry`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `HomeScreen` (e.g. with `MonthlyYearlyToggle` and `RegimeToggle`) actually correct?**
  _`HomeScreen` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `formatINR()` (e.g. with `BreakdownLineItem()` and `getRecommendationText()`) actually correct?**
  _`formatINR()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Main Entry`, `Vite Config`, `Tailwind Config` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._