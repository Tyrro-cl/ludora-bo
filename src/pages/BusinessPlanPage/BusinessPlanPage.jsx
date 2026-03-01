import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/atoms/Icon/Icon';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import { DEFAULT_NAV_GROUPS } from '../../components/organisms/SideNav/SideNav';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart,
} from 'recharts';
import {
  MONTHS_Y1, MONTHS_Y2, MONTHS_Y3,
  compteResultat, planFinancement, tresorerie, pilotage, kpis,
} from './businessPlanData';
import './BusinessPlanPage.css';

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'layout-grid' },
  { id: 'financement', label: 'Plan de financement', icon: 'landmark' },
  { id: 'resultat', label: 'Compte de résultat', icon: 'receipt' },
  { id: 'tresorerie', label: 'Suivi de trésorerie', icon: 'wallet' },
  { id: 'pilotage', label: 'Pilotage & KPIs', icon: 'gauge' },
];

const CHART_COLORS = {
  primary: '#6c63ff',
  secondary: '#48bb78',
  tertiary: '#ecb22e',
  danger: '#e53e3e',
  muted: '#a0aec0',
  area: 'rgba(108, 99, 255, 0.15)',
  areaGreen: 'rgba(72, 187, 120, 0.15)',
};

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtShort = (n) => {
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(0)}k€`;
  return `${n}€`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bp-chart-tooltip">
      <p className="bp-chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {fmt(entry.value)}
        </p>
      ))}
    </div>
  );
};

function KpiCard({ title, value, subtitle, trend, trendDir, icon }) {
  return (
    <div className="bp-kpi-card">
      <div className="bp-kpi-icon">
        <Icon name={icon} size={18} color="var(--color-text-on-dark-100)" />
      </div>
      <p className="bp-kpi-title">{title}</p>
      <p className="bp-kpi-value">{value}</p>
      {subtitle && <p className="bp-kpi-subtitle">{subtitle}</p>}
      {trend && (
        <span className={`bp-kpi-trend bp-kpi-trend--${trendDir || 'positive'}`}>
          {trend}
        </span>
      )}
    </div>
  );
}

function DataTable({ headers, rows, highlightLast }) {
  return (
    <div className="bp-table-wrapper">
      <table className="bp-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={highlightLast && ri === rows.length - 1 ? 'bp-table-highlight' : ''}>
              {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OverviewTab() {
  const caData = [
    { name: 'Année 1', ca: compteResultat.year1.caTotal, resultat: compteResultat.year1.resultatTotal },
    { name: 'Année 2', ca: compteResultat.year2.caTotal, resultat: compteResultat.year2.resultatTotal },
    { name: 'Année 3', ca: compteResultat.year3.caTotal, resultat: compteResultat.year3.resultatTotal },
  ];

  const revenueBreakdown = [
    { name: 'Abonnements Premium', value: compteResultat.year1.services.premiumsTotal + compteResultat.year2.services.premiumsTotal + compteResultat.year3.services.premiumsTotal },
    { name: 'Souscriptions scolaires', value: compteResultat.year1.services.scolairesTotal + compteResultat.year2.services.scolairesTotal + compteResultat.year3.services.scolairesTotal },
  ];
  const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary];

  const growthData = pilotage.cumulAbonnements.year1.map((v, i) => ({ name: MONTHS_Y1[i], y1: v }))
    .concat(pilotage.cumulAbonnements.year2.map((v, i) => ({ name: MONTHS_Y2[i], y2: v })))
    .concat(pilotage.cumulAbonnements.year3.map((v, i) => ({ name: MONTHS_Y3[i], y3: v })));

  const cumulAllYears = [
    ...pilotage.cumulAbonnements.year1.map((v, i) => ({ name: MONTHS_Y1[i], value: v })),
    ...pilotage.cumulAbonnements.year2.map((v, i) => ({ name: MONTHS_Y2[i], value: v })),
    ...pilotage.cumulAbonnements.year3.map((v, i) => ({ name: MONTHS_Y3[i], value: v })),
  ];

  return (
    <div className="bp-tab-content">
      <div className="bp-kpi-grid">
        <KpiCard title="CA Total (3 ans)" value={fmt(kpis.caTotal3ans)} icon="trending-up" trend={`+${kpis.croissanceCA_Y2Y3}% A3`} trendDir="positive" />
        <KpiCard title="Résultat cumulé (3 ans)" value={fmt(kpis.resultatTotal3ans)} icon="piggy-bank" subtitle="Avant impôt" trendDir="positive" />
        <KpiCard title="Abonnés cumulés (fin A3)" value={kpis.cumulAbonnesY3.toLocaleString('fr-FR')} icon="users" trend="+3 634 utilisateurs" trendDir="positive" />
        <KpiCard title="Classes souscrites (fin A3)" value={kpis.cumulClassesY3.toString()} icon="school" trend="+620 classes" trendDir="positive" />
        <KpiCard title="Trésorerie fin A1" value={fmt(kpis.tresorerieFin)} icon="wallet" subtitle="Solde positif" trendDir="positive" />
        <KpiCard title="Seuil de rentabilité" value={kpis.seuilRentabilite} icon="target" subtitle="Atteint dès l'année 1" trendDir="positive" />
      </div>

      <div className="bp-charts-row">
        <div className="bp-chart-card">
          <h3>Évolution du CA et Résultat</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={caData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={12} />
              <YAxis stroke="var(--color-text-on-dark-60)" fontSize={11} tickFormatter={fmtShort} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'var(--color-text-on-dark-80)', fontSize: 12 }} />
              <Bar dataKey="ca" name="Chiffre d'affaires" fill={CHART_COLORS.primary} radius={[4,4,0,0]} />
              <Bar dataKey="resultat" name="Résultat avant impôt" fill={CHART_COLORS.secondary} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bp-chart-card">
          <h3>Répartition du CA (3 ans)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {revenueBreakdown.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bp-chart-card bp-chart-card--full">
        <h3>Croissance des abonnés cumulés</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={cumulAllYears}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={10} interval={2} />
            <YAxis stroke="var(--color-text-on-dark-60)" fontSize={11} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" name="Abonnés cumulés" stroke={CHART_COLORS.primary} fill={CHART_COLORS.area} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function FinancementTab() {
  const pieBesoins = planFinancement.besoins.filter(b => b.montant > 0);
  const pieRessources = planFinancement.ressources.filter(r => r.montant > 0);
  const COLORS_B = [CHART_COLORS.primary, '#8884d8', '#82ca9d', '#ffc658', CHART_COLORS.danger, '#a0aec0', '#ff7c43'];
  const COLORS_R = [CHART_COLORS.secondary, '#48bb78', '#38a169', CHART_COLORS.tertiary];

  return (
    <div className="bp-tab-content">
      <div className="bp-section-header">
        <h2>Plan de financement initial</h2>
        <p>Détail des besoins et ressources au démarrage</p>
      </div>

      <div className="bp-financing-grid">
        <div className="bp-chart-card">
          <h3>Besoins – {fmt(planFinancement.besoinsTotal)}</h3>
          <DataTable
            headers={['Poste', 'Montant HT']}
            rows={[
              ...planFinancement.besoins.map(b => [b.label, fmt(b.montant)]),
              ['TOTAL DES BESOINS', fmt(planFinancement.besoinsTotal)],
            ]}
            highlightLast
          />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieBesoins} cx="50%" cy="50%" outerRadius={80} dataKey="montant" nameKey="label" label={({ label, percent }) => `${label} ${(percent * 100).toFixed(0)}%`}>
                {pieBesoins.map((_, i) => <Cell key={i} fill={COLORS_B[i % COLORS_B.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bp-chart-card">
          <h3>Ressources – {fmt(planFinancement.ressourcesTotal)}</h3>
          <DataTable
            headers={['Source', 'Montant HT']}
            rows={[
              ...planFinancement.ressources.map(r => [r.label, fmt(r.montant)]),
              ['TOTAL DES RESSOURCES', fmt(planFinancement.ressourcesTotal)],
            ]}
            highlightLast
          />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieRessources} cx="50%" cy="50%" outerRadius={80} dataKey="montant" nameKey="label" label={({ label, percent }) => `${label} ${(percent * 100).toFixed(0)}%`}>
                {pieRessources.map((_, i) => <Cell key={i} fill={COLORS_R[i % COLORS_R.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bp-chart-card">
        <h3>Détail du besoin en fonds de roulement</h3>
        <DataTable
          headers={['Poste', 'Montant HT']}
          rows={[
            ...planFinancement.bfr.map(b => [b.label, fmt(b.montant)]),
            ['TOTAL BFR', fmt(planFinancement.besoins.find(b => b.label.includes('fonds')).montant)],
          ]}
          highlightLast
        />
      </div>

      <div className="bp-equilibre-card">
        <Icon name="check-circle" size={24} color="var(--color-utility-increase)" />
        <div>
          <h3>Équilibre financier atteint</h3>
          <p>Écart besoins / ressources : {fmt(0)} — Le plan est équilibré.</p>
        </div>
      </div>
    </div>
  );
}

function ResultatTab() {
  const [selectedYear, setSelectedYear] = useState('year1');
  const data = compteResultat[selectedYear];
  const months = selectedYear === 'year1' ? MONTHS_Y1 : selectedYear === 'year2' ? MONTHS_Y2 : MONTHS_Y3;

  const chartData = months.map((m, i) => ({
    name: m,
    ca: data.ca[i],
    charges: data.chargesVariables[i] + data.autresCharges[i] + data.personnel[i],
    resultat: data.resultat[i],
  }));

  const structureData = [
    { name: 'Charges variables', value: data.chargesVariablesTotal },
    { name: 'Charges externes', value: data.autresChargesTotal },
    { name: 'Charges de personnel', value: data.personnelTotal },
  ];
  const STRUCT_COLORS = [CHART_COLORS.tertiary, CHART_COLORS.danger, CHART_COLORS.primary];

  return (
    <div className="bp-tab-content">
      <div className="bp-section-header">
        <h2>Compte de résultat prévisionnel</h2>
        <p>{data.label}</p>
      </div>

      <div className="bp-year-selector">
        {['year1', 'year2', 'year3'].map((y, i) => (
          <button key={y} className={`bp-year-btn ${selectedYear === y ? 'bp-year-btn--active' : ''}`} onClick={() => setSelectedYear(y)}>
            Année {i + 1}
          </button>
        ))}
      </div>

      <div className="bp-kpi-grid bp-kpi-grid--4">
        <KpiCard title="Chiffre d'affaires HT" value={fmt(data.caTotal)} icon="trending-up" trendDir="positive" />
        <KpiCard title="Marge sur coût variable" value={fmt(data.margeCoutVariableTotal)} icon="percent" trendDir="positive" />
        <KpiCard title="Valeur ajoutée" value={fmt(data.valeurAjouteeTotal)} icon="gem" trendDir="positive" />
        <KpiCard title="Résultat avant impôt" value={fmt(data.resultatTotal)} icon="calculator" trendDir={data.resultatTotal >= 0 ? 'positive' : 'negative'} />
      </div>

      <div className="bp-charts-row">
        <div className="bp-chart-card" style={{ flex: 2 }}>
          <h3>CA vs Charges vs Résultat mensuel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={10} />
              <YAxis stroke="var(--color-text-on-dark-60)" fontSize={11} tickFormatter={fmtShort} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'var(--color-text-on-dark-80)', fontSize: 12 }} />
              <Bar dataKey="ca" name="CA HT" fill={CHART_COLORS.primary} radius={[3,3,0,0]} />
              <Bar dataKey="charges" name="Total charges" fill={CHART_COLORS.danger} radius={[3,3,0,0]} opacity={0.7} />
              <Line type="monotone" dataKey="resultat" name="Résultat" stroke={CHART_COLORS.secondary} strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bp-chart-card" style={{ flex: 1 }}>
          <h3>Structure des charges</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={structureData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {structureData.map((_, i) => <Cell key={i} fill={STRUCT_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'var(--color-text-on-dark-80)', fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bp-chart-card">
        <h3>Détail mensuel – {data.label}</h3>
        <DataTable
          headers={['', ...months, 'TOTAL']}
          rows={[
            ["CA HT", ...data.ca.map(fmt), fmt(data.caTotal)],
            ["Charges variables", ...data.chargesVariables.map(fmt), fmt(data.chargesVariablesTotal)],
            ["Marge / coût variable", ...data.margeCoutVariable.map(fmt), fmt(data.margeCoutVariableTotal)],
            ["Charges externes", ...data.autresCharges.map(fmt), fmt(data.autresChargesTotal)],
            ["Valeur ajoutée", ...data.valeurAjoutee.map(fmt), fmt(data.valeurAjouteeTotal)],
            ["Charges de personnel", ...data.personnel.map(fmt), fmt(data.personnelTotal)],
            ["EBE", ...data.ebe.map(fmt), fmt(data.ebeTotal)],
            ["Résultat avant impôt", ...data.resultat.map(fmt), fmt(data.resultatTotal)],
          ]}
          highlightLast
        />
      </div>
    </div>
  );
}

function TresorerieTab() {
  const labels = ['Début', ...MONTHS_Y1];
  const chartData = labels.map((m, i) => ({
    name: m,
    entrees: tresorerie.entrees[i],
    sorties: tresorerie.sorties[i],
    solde: tresorerie.tresorerieCumul[i],
  }));

  return (
    <div className="bp-tab-content">
      <div className="bp-section-header">
        <h2>Suivi de trésorerie</h2>
        <p>Année 1 – Flux mensuels et solde cumulé</p>
      </div>

      <div className="bp-kpi-grid bp-kpi-grid--4">
        <KpiCard title="Total entrées" value={fmt(tresorerie.totalEntrees)} icon="arrow-down-circle" trendDir="positive" />
        <KpiCard title="Total sorties" value={fmt(tresorerie.totalSorties)} icon="arrow-up-circle" trendDir="negative" />
        <KpiCard title="Solde final" value={fmt(tresorerie.tresorerieCumul[tresorerie.tresorerieCumul.length - 1])} icon="wallet" trendDir="positive" />
        <KpiCard title="Solde le plus bas" value={fmt(Math.min(...tresorerie.tresorerieCumul))} icon="alert-triangle" subtitle="Point de vigilance" trendDir="warning" />
      </div>

      <div className="bp-chart-card bp-chart-card--full">
        <h3>Entrées / Sorties et trésorerie cumulée</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={10} />
            <YAxis stroke="var(--color-text-on-dark-60)" fontSize={11} tickFormatter={fmtShort} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'var(--color-text-on-dark-80)', fontSize: 12 }} />
            <Bar dataKey="entrees" name="Entrées" fill={CHART_COLORS.secondary} radius={[3,3,0,0]} />
            <Bar dataKey="sorties" name="Sorties" fill={CHART_COLORS.danger} radius={[3,3,0,0]} opacity={0.7} />
            <Line type="monotone" dataKey="solde" name="Trésorerie cumulée" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bp-chart-card">
        <h3>Détail mensuel de la trésorerie</h3>
        <DataTable
          headers={['', ...labels, 'TOTAL']}
          rows={[
            ['Entrées', ...tresorerie.entrees.map(fmt), fmt(tresorerie.totalEntrees)],
            ['Sorties', ...tresorerie.sorties.map(fmt), fmt(tresorerie.totalSorties)],
            ['Différence', ...tresorerie.difference.map(fmt), fmt(tresorerie.totalEntrees - tresorerie.totalSorties)],
            ['Trésorerie cumulée', ...tresorerie.tresorerieCumul.map(fmt), ''],
          ]}
          highlightLast
        />
      </div>
    </div>
  );
}

function PilotageTab() {
  const allMonths = [...MONTHS_Y1, ...MONTHS_Y2, ...MONTHS_Y3];
  const allVentes = [...pilotage.ventesAbonnements.year1, ...pilotage.ventesAbonnements.year2, ...pilotage.ventesAbonnements.year3];
  const allCumul = [...pilotage.cumulAbonnements.year1, ...pilotage.cumulAbonnements.year2, ...pilotage.cumulAbonnements.year3];
  const allCA = [...compteResultat.year1.ca, ...compteResultat.year2.ca, ...compteResultat.year3.ca];

  const mainChart = allMonths.map((m, i) => ({
    name: m,
    ventes: allVentes[i],
    cumul: allCumul[i],
    ca: allCA[i],
  }));

  const yearComparison = [
    { name: 'Année 1', abonnements: pilotage.ventesAbonnements.totals[0], classes: pilotage.ventesClasses.year1, ca: pilotage.caTotal.year1, benefice: pilotage.beneficeTotal.year1 },
    { name: 'Année 2', abonnements: pilotage.ventesAbonnements.totals[1], classes: pilotage.ventesClasses.year2, ca: pilotage.caTotal.year2, benefice: pilotage.beneficeTotal.year2 },
    { name: 'Année 3', abonnements: pilotage.ventesAbonnements.totals[2], classes: pilotage.ventesClasses.year3, ca: pilotage.caTotal.year3, benefice: pilotage.beneficeTotal.year3 },
  ];

  return (
    <div className="bp-tab-content">
      <div className="bp-section-header">
        <h2>Pilotage & Indicateurs clés</h2>
        <p>Suivi des performances sur 3 ans</p>
      </div>

      <div className="bp-kpi-grid">
        <KpiCard title="Prix abonnement TTC" value={fmt(pilotage.prixVenteTTC)} icon="tag" subtitle={`HT: ${fmt(pilotage.prixVenteHT)}`} />
        <KpiCard title="Prix classe / an HT" value={fmt(pilotage.prixClasseHT)} icon="school" />
        <KpiCard title="Croissance CA A1→A2" value={`+${kpis.croissanceCA_Y1Y2}%`} icon="trending-up" trendDir="positive" />
        <KpiCard title="Croissance CA A2→A3" value={`+${kpis.croissanceCA_Y2Y3}%`} icon="trending-up" trendDir="positive" />
      </div>

      <div className="bp-chart-card bp-chart-card--full">
        <h3>Ventes mensuelles et cumul abonnés (3 ans)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={mainChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={9} interval={2} />
            <YAxis yAxisId="left" stroke="var(--color-text-on-dark-60)" fontSize={11} />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-on-dark-60)" fontSize={11} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'var(--color-text-on-dark-80)', fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="ventes" name="Ventes mensuelles" fill={CHART_COLORS.primary} radius={[2,2,0,0]} opacity={0.8} />
            <Line yAxisId="right" type="monotone" dataKey="cumul" name="Abonnés cumulés" stroke={CHART_COLORS.secondary} strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bp-chart-card">
        <h3>Comparaison annuelle</h3>
        <DataTable
          headers={['Indicateur', 'Année 1', 'Année 2', 'Année 3']}
          rows={[
            ['Abonnements vendus', ...yearComparison.map(y => y.abonnements.toLocaleString('fr-FR'))],
            ['Classes souscrites', ...yearComparison.map(y => y.classes.toLocaleString('fr-FR'))],
            ["Chiffre d'affaires HT", ...yearComparison.map(y => fmt(y.ca))],
            ['Valeur ajoutée', ...yearComparison.map(y => fmt(y.benefice))],
            ['Abonnés cumulés (fin)', pilotage.cumulAbonnements.year1[11].toLocaleString('fr-FR'), pilotage.cumulAbonnements.year2[11].toLocaleString('fr-FR'), pilotage.cumulAbonnements.year3[11].toLocaleString('fr-FR')],
            ['Classes cumulées (fin)', pilotage.classesSouscrites.year1.toString(), pilotage.classesSouscrites.year2.toString(), pilotage.classesSouscrites.year3.toString()],
          ]}
        />
      </div>

      <div className="bp-chart-card bp-chart-card--full">
        <h3>Évolution du chiffre d'affaires mensuel (3 ans)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mainChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="var(--color-text-on-dark-60)" fontSize={9} interval={2} />
            <YAxis stroke="var(--color-text-on-dark-60)" fontSize={11} tickFormatter={fmtShort} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ca" name="CA mensuel HT" stroke={CHART_COLORS.tertiary} fill="rgba(236,178,46,0.15)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const TAB_COMPONENTS = {
  overview: OverviewTab,
  financement: FinancementTab,
  resultat: ResultatTab,
  tresorerie: TresorerieTab,
  pilotage: PilotageTab,
};

const TAB_BY_NAV_ID = {
  bpOverview: 'overview',
  bpFinancement: 'financement',
  bpResultat: 'resultat',
  bpTresorerie: 'tresorerie',
  bpPilotage: 'pilotage',
};

const BusinessPlanPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const ActiveComponent = TAB_COMPONENTS[activeTab] || TAB_COMPONENTS.overview;

  const setActiveTab = (tabId) => {
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const navGroups = useMemo(() => {
    return DEFAULT_NAV_GROUPS.map(group => {
      if (group.id === 'businessPlan') {
        return {
          ...group,
          selected: true,
          items: group.items.map(item => ({
            ...item,
            selected: TAB_BY_NAV_ID[item.id] === activeTab,
            onClick: () => {
              const tab = TAB_BY_NAV_ID[item.id];
              if (tab) navigate(`/business-plan?tab=${tab}`);
            },
          })),
        };
      }
      if (group.id === 'home') {
        return {
          ...group,
          selected: false,
          items: group.items.map(item => ({
            ...item,
            selected: false,
            onClick: () => navigate('/home/overview'),
          })),
        };
      }
      return { ...group, selected: false };
    });
  }, [activeTab, navigate]);

  return (
    <DashboardLayout user={user} onLogout={logout} navGroups={navGroups}>
      <div className="bp-page">
        <div className="bp-toolbar">
          <p className="bp-toolbar-breadcrumb">
            <span>Accueil</span>
            <span className="bp-breadcrumb-sep">/</span>
            <span>Business Plan</span>
          </p>
        </div>

        <section className="bp-banner">
          <div>
            <h1>Business Plan – Ludora</h1>
            <p>Prévisions financières et indicateurs clés sur 3 ans</p>
          </div>
          <div className="bp-banner-right">
            <span>Mai 2027 – Avril 2030</span>
            <strong>3 ans</strong>
          </div>
        </section>

        <nav className="bp-tabs" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`bp-tab ${activeTab === tab.id ? 'bp-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon} size={16} color={activeTab === tab.id ? 'var(--color-text-on-dark-100)' : 'var(--color-text-on-dark-60)'} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <ActiveComponent />
      </div>
    </DashboardLayout>
  );
};

export default BusinessPlanPage;
