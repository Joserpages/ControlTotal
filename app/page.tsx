"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  ClipboardList,
  Package,
  Search,
  Sparkles,
  TrendingUp,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

const stats = [
  {
    label: "Valor en inventario",
    value: "Q 284,900",
    change: "+8.4%",
    icon: Warehouse,
    tone: "cyan",
  },
  {
    label: "Productos registrados",
    value: "1,248",
    change: "+124",
    icon: Package,
    tone: "fuchsia",
  },
  {
    label: "Alertas activas",
    value: "06",
    change: "-2",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    label: "Movimientos del día",
    value: "326",
    change: "+23%",
    icon: Activity,
    tone: "emerald",
  },
];

const inventory = [
  {
    code: "INV-001",
    name: "Laptop Empresarial Pro 14",
    category: "Equipos",
    stock: 22,
    min: 10,
    status: "Óptimo",
    location: "Bodega Central",
    amount: "Q 186,000",
  },
  {
    code: "INV-002",
    name: "Monitor 24” Full HD",
    category: "Pantallas",
    stock: 8,
    min: 12,
    status: "Crítico",
    location: "Showroom",
    amount: "Q 14,400",
  },
  {
    code: "INV-003",
    name: "Mouse Inalámbrico",
    category: "Accesorios",
    stock: 48,
    min: 20,
    status: "Óptimo",
    location: "Bodega A-1",
    amount: "Q 8,640",
  },
  {
    code: "INV-004",
    name: "Teclado Mecánico",
    category: "Periféricos",
    stock: 12,
    min: 15,
    status: "Bajo",
    location: "Bodega A-2",
    amount: "Q 5,760",
  },
  {
    code: "INV-005",
    name: "Disco SSD 1TB",
    category: "Almacenamiento",
    stock: 35,
    min: 18,
    status: "Óptimo",
    location: "Bodega A-3",
    amount: "Q 17,500",
  },
  {
    code: "INV-006",
    name: "Impresora Térmica",
    category: "Punto de venta",
    stock: 4,
    min: 10,
    status: "Crítico",
    location: "Sucursal Norte",
    amount: "Q 6,800",
  },
];

const movements = [
  {
    type: "Entrada",
    product: "Laptop Empresarial Pro 14",
    qty: "+10 unidades",
    user: "Compras",
    time: "08:45 AM",
  },
  {
    type: "Salida",
    product: "Mouse Inalámbrico",
    qty: "-16 unidades",
    user: "Ventas",
    time: "09:12 AM",
  },
  {
    type: "Ajuste",
    product: "Impresora Térmica",
    qty: "-2 unidades",
    user: "Auditoría",
    time: "10:08 AM",
  },
  {
    type: "Transferencia",
    product: "Monitor 24” Full HD",
    qty: "-5 unidades",
    user: "Logística",
    time: "11:36 AM",
  },
];

const alerts = [
  "2 productos por debajo del mínimo configurado.",
  "1 transferencia pendiente de aprobación interna.",
  "Diferencia detectada en conteo físico de Showroom.",
];

const weeklyBars = [52, 68, 64, 82, 76, 91, 73];
const weeklyLabels = ["L", "M", "M", "J", "V", "S", "D"];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, delay },
  };
}

function statusClass(status: string) {
  if (status === "Óptimo") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "Bajo") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-rose-200 bg-rose-50 text-rose-700";
}

function movementClass(type: string) {
  if (type === "Entrada") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (type === "Salida") return "border-sky-200 bg-sky-50 text-sky-700";
  if (type === "Ajuste") return "border-violet-200 bg-violet-50 text-violet-700";
  return "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700";
}

function statTone(tone: string) {
  if (tone === "cyan") return "from-cyan-500/18 via-sky-500/12 to-white border-cyan-200";
  if (tone === "fuchsia") return "from-fuchsia-500/18 via-violet-500/12 to-white border-fuchsia-200";
  if (tone === "amber") return "from-amber-500/18 via-orange-400/12 to-white border-amber-200";
  return "from-emerald-500/18 via-teal-400/12 to-white border-emerald-200";
}

export default function DemoControlInventario() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [showMovementModal, setShowMovementModal] = useState(false);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = [item.code, item.name, item.category, item.location]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = statusFilter === "Todos" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalCritical = inventory.filter((item) => item.status === "Crítico").length;
  const totalLow = inventory.filter((item) => item.status === "Bajo").length;
  const totalOptimal = inventory.filter((item) => item.status === "Óptimo").length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_24%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_24%),linear-gradient(180deg,#fbfeff_0%,#f3f9ff_38%,#fdf4ff_72%,#fff8ef_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-50 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative z-10 mx-auto w-full max-w-md px-3 pb-28 pt-3 sm:max-w-lg sm:px-4 md:max-w-5xl md:px-6 md:pb-10">
        <motion.div
          {...fadeUp(0)}
          className="overflow-hidden rounded-[28px] border border-white/80 bg-white/72 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
        >
          <div className="px-4 pb-5 pt-4 sm:px-5 md:px-7 md:pb-7 md:pt-6">
            <div className="rounded-[24px] border border-white/80 bg-white/82 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-5">
              <div className="flex items-start gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_0_25px_rgba(34,211,238,0.16)] sm:h-16 sm:w-16">
                  <Image
                    src="/img/logo.png"
                    alt="VentasTotal"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-[11px]">
                    Demo de ventas e inventario
                  </div>

                  <h1 className="mt-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 bg-clip-text text-[2rem] font-black leading-none tracking-tight text-transparent sm:text-[2.5rem]">
                    VentasTotal
                  </h1>

                  <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-600 sm:text-[15px]">
                    Controla stock, movimientos, alertas y sucursales con una imagen
                    moderna, visual y lista para vender desde el celular.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Exportar PDF
                </button>

                <button
                  onClick={() => setShowMovementModal(true)}
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(168,85,247,0.22)] transition hover:scale-[1.01]"
                >
                  Nuevo movimiento
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                {
                  icon: TrendingUp,
                  title: "Más control",
                  text: "Todo el inventario visible en tiempo real.",
                  box: "border-cyan-200 bg-cyan-50/90 text-cyan-700",
                },
                {
                  icon: Sparkles,
                  title: "Imagen premium",
                  text: "Diseño moderno para causar mejor impresión.",
                  box: "border-fuchsia-200 bg-fuchsia-50/90 text-fuchsia-700",
                },
                {
                  icon: Boxes,
                  title: "Ideal para ventas",
                  text: "Perfecto para mostrar orden, rapidez y control frente a tus clientes.",
                  box: "border-amber-200 bg-amber-50/90 text-amber-700",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp(0.04 + index * 0.04)}
                    className={`rounded-[22px] border p-4 shadow-sm ${item.box}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{item.title}</div>
                        <p className="mt-1 text-[13px] leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.section
              {...fadeUp(0.12)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Panel visual
                  </div>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Resumen rápido
                  </h2>
                </div>

                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  En línea
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(0.14 + index * 0.03)}
                      className={`rounded-[22px] border bg-gradient-to-br p-4 shadow-sm ${statTone(item.tone)}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold leading-4 text-slate-500">
                            {item.label}
                          </div>
                          <div className="mt-2 text-[1.45rem] font-black leading-none text-slate-900 sm:text-[1.7rem]">
                            {item.value}
                          </div>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {item.change}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.18)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Control de inventario
                  </div>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Productos y stock
                  </h2>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600 sm:text-sm">
                    Vista móvil optimizada para buscar, revisar estado y mostrar valor del inventario.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                    <Search className="h-4 w-4 text-cyan-600" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar producto, código o categoría"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 shadow-sm outline-none"
                  >
                    <option>Todos</option>
                    <option>Óptimo</option>
                    <option>Bajo</option>
                    <option>Crítico</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {filteredInventory.map((item, index) => (
                  <motion.div
                    key={item.code}
                    {...fadeUp(0.2 + index * 0.03)}
                    className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                          {item.code}
                        </div>
                        <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                          {item.name}
                        </h3>
                        <div className="mt-1 text-sm text-slate-500">{item.category}</div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${statusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Stock
                        </div>
                        <div className="mt-1 text-lg font-black text-slate-900">{item.stock}</div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Mínimo
                        </div>
                        <div className="mt-1 text-lg font-black text-slate-900">{item.min}</div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Ubicación
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">{item.location}</div>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-br from-cyan-50 via-fuchsia-50 to-amber-50 p-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Valor
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-900">{item.amount}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Óptimos
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-900">{totalOptimal}</div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                    Bajos
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-900">{totalLow}</div>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-700">
                    Críticos
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-900">{totalCritical}</div>
                </div>
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.24)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Alertas
                  </div>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Estado operativo
                  </h2>
                </div>

                <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
                  {alerts.length} activas
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={alert}
                    className={`rounded-[22px] border p-4 text-sm leading-6 ${
                      index === 0
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {alert}
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.28)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Actividad
                </div>
                <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                  Rendimiento semanal
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">
                  Visual pensado para que en celular se vea grande y atractivo.
                </p>
              </div>

              <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Actividad logística
                  </span>
                  <span className="text-xs font-bold text-fuchsia-600">7 días</span>
                </div>

                <div className="flex h-52 items-end justify-between gap-2">
                  {weeklyBars.map((height, i) => (
                    <div key={i} className="flex w-full flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: `${height}%`, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        className="w-full rounded-t-[16px] bg-gradient-to-t from-cyan-500 via-fuchsia-500 to-amber-400 shadow-[0_10px_24px_rgba(168,85,247,0.16)]"
                      />
                      <span className="text-[11px] font-medium text-slate-500">{weeklyLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.32)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Flujo reciente
                  </div>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Movimientos
                  </h2>
                </div>

                <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  En vivo
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {movements.map((move, index) => (
                  <motion.div
                    key={`${move.type}-${move.product}-${index}`}
                    {...fadeUp(0.34 + index * 0.03)}
                    className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${movementClass(
                            move.type
                          )}`}
                        >
                          {move.type}
                        </span>

                        <div className="mt-3 text-base font-black leading-6 text-slate-900">
                          {move.product}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                          Responsable: {move.user}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                          Hora: {move.time}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-3 py-2 text-right">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Cantidad
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-900">{move.qty}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.38)}
              className="mt-4 rounded-[26px] border border-white/80 bg-white/82 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-5"
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Vista ejecutiva
                  </div>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Presentación premium
                  </h2>
                </div>

                <div className="text-xs font-bold text-fuchsia-600">Actualizado 2 min</div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="rounded-[24px] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white p-5">
                  <div className="text-sm font-semibold text-cyan-700">Disponibilidad operativa</div>
                  <div className="mt-2 text-[2.2rem] font-black leading-none text-slate-900">
                    94%
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Inventario mejor organizado, menor riesgo de faltantes y decisiones más rápidas.
                  </p>
                </div>

                <div className="rounded-[24px] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-violet-50 to-white p-5">
                  <div className="text-sm font-semibold text-fuchsia-700">Órdenes procesadas</div>
                  <div className="mt-2 text-[2.2rem] font-black leading-none text-slate-900">
                    1,532
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Flujo más claro entre compras, ventas, bodega y control administrativo.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Centros de operación</div>
                    <div className="mt-1 text-xs text-slate-500">Monitoreo por sucursal</div>
                  </div>

                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    4 en línea
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Bodega Central", "96%", "Óptima"],
                    ["Sucursal Norte", "82%", "Supervisión"],
                    ["Showroom", "74%", "Reabastecer"],
                    ["Punto de despacho", "91%", "Estable"],
                  ].map(([name, value, status]) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900">{name}</div>
                          <div className="mt-1 text-xs text-slate-500">{status}</div>
                        </div>
                        <div className="text-sm font-black text-slate-900">{value}</div>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
        <div className="mx-auto max-w-md rounded-[24px] border border-white/80 bg-white/85 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-2">
            {[
              [Boxes, "Dashboard"],
              [ClipboardList, "Movimientos"],
              [Truck, "Sucursales"],
            ].map(([Icon, label], index) => {
              const TabIcon = Icon as typeof Boxes;
              return (
                <button
                  key={String(label)}
                  className={`rounded-2xl px-3 py-3 text-center text-[11px] font-bold ${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 text-white"
                      : "bg-slate-50 text-slate-700"
                  }`}
                >
                  <TabIcon className="mx-auto mb-1 h-4 w-4" />
                  {String(label)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMovementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/35 p-0 backdrop-blur-md md:items-center md:p-4"
            onClick={() => setShowMovementModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-t-[30px] border border-white/80 bg-white p-5 shadow-[0_30px_120px_rgba(15,23,42,0.18)] md:rounded-[30px] md:p-6"
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-200 md:hidden" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-700">
                    Inventario
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-slate-900">
                    Registrar movimiento
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Registra entradas, salidas y ajustes con una experiencia clara y visual.
                  </p>
                </div>

                <button
                  onClick={() => setShowMovementModal(false)}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Tipo de movimiento: Entrada
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Producto: Laptop Empresarial Pro 14
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Cantidad: 10 unidades
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Responsable: Compras
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setShowMovementModal(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowMovementModal(false)}
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 px-5 py-4 text-sm font-semibold text-white"
                >
                  Guardar movimiento
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}