"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Package,
  Search,
  ShieldCheck,
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
  },
  {
    label: "Productos registrados",
    value: "1,248",
    change: "+124",
    icon: Package,
  },
  {
    label: "Alertas activas",
    value: "06",
    change: "-2",
    icon: AlertTriangle,
  },
  {
    label: "Movimientos del día",
    value: "326",
    change: "+23%",
    icon: Activity,
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

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.48, delay },
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
  if (type === "Entrada") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (type === "Salida") return "bg-sky-50 text-sky-700 border-sky-200";
  if (type === "Ajuste") return "bg-violet-50 text-violet-700 border-violet-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_40%,#f7faff_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-40 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative z-10 mx-auto w-full max-w-md px-3 pb-28 pt-3 sm:max-w-xl sm:px-4 md:max-w-6xl md:px-6 md:pb-12">
        <motion.div
          {...fadeUp(0)}
          className="overflow-hidden rounded-[34px] border border-white/80 bg-white/76 shadow-[0_28px_90px_rgba(15,23,42,0.09)] backdrop-blur-2xl"
        >
          <div className="px-3 pb-5 pt-3 sm:px-5 md:px-7 md:pb-7 md:pt-6">
            <div className="relative overflow-hidden rounded-[30px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,249,255,0.96))] p-4 shadow-[0_20px_50px_rgba(37,99,235,0.08)] sm:p-5 md:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_22%)]" />

              <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-sky-100 bg-white shadow-[0_0_0_4px_rgba(14,165,233,0.05),0_14px_28px_rgba(37,99,235,0.10)] sm:h-16 sm:w-16">
                      <Image
                        src="/img/logo.png"
                        alt="VentasTotal"
                        fill
                        className="object-contain p-2"
                        priority
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] text-sky-700 sm:text-[11px]">
                        <Sparkles className="h-3.5 w-3.5" />
                       
                      </div>

                      <h1 className="mt-3 max-w-xl text-[2.2rem] font-black leading-[0.92] tracking-tight text-slate-950 sm:text-[3rem]">
                        Haz que tu negocio se mire
                        <span className="block bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ordenado, moderno y confiable
                        </span>
                      </h1>

                      <p className="mt-3 max-w-xl text-[14px] leading-7 text-slate-600 sm:text-[15px]">
                        Una vista clara para mostrar inventario, movimientos y control en tiempo
                        real. Perfecta para vender una imagen más profesional desde el celular.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {[
                      "Más orden visual",
                      "Mejor impresión al cliente",
                      "Ideal para publicaciones",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => setShowMovementModal(true)}
                      className="group min-h-[56px] rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_44px_rgba(37,99,235,0.22)] transition hover:scale-[1.01]"
                    >
                      <span className="inline-flex items-center gap-2">
                        Realizar movimientos
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="min-h-[56px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:bg-slate-50"
                    >
                      Exportar PDF
                    </button>
                  </div>
                </div>

                <motion.div
                  {...fadeUp(0.08)}
                  className="relative rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,#0f172a_0%,#13203d_100%)] p-4 shadow-[0_26px_60px_rgba(15,23,42,0.20)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-200/80">
                       
                      </div>
                      <div className="mt-1 text-lg font-black text-white">Dashboard limpio</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
                      En línea
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-[22px] border border-white/10 bg-white/8 p-3 backdrop-blur-xl"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[10px] font-semibold leading-4 text-slate-300">
                                {item.label}
                              </div>
                              <div className="mt-2 text-[1.25rem] font-black leading-none text-white">
                                {item.value}
                              </div>
                            </div>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)]">
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          </div>

                          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-sky-100">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            {item.change}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-[22px] border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                          Rendimiento
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          Movimiento semanal
                        </div>
                      </div>

                      <div className="rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold text-sky-200">
                        +18%
                      </div>
                    </div>

                    <div className="mt-4 flex h-24 items-end gap-2">
                      {[42, 58, 54, 76, 68, 84, 72].map((bar, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="w-full rounded-full bg-gradient-to-t from-sky-500 via-blue-500 to-cyan-300"
                            style={{ height: `${bar}%` }}
                          />
                          <span className="text-[10px] font-semibold text-slate-400">
                            {["L", "M", "M", "J", "V", "S", "D"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Se mira confiable",
                  text: "Diseño más limpio y serio para que el cliente perciba orden y control.",
                },
                {
                  icon: TrendingUp,
                  title: "Vende mejor tu servicio",
                  text: "La pantalla impacta más para anuncios, reels, historias o publicaciones.",
                },
                {
                  icon: CheckCircle2,
                  title: "Perfecto para celular",
                  text: "Todo está acomodado para verse fuerte en vista móvil y llamar la atención.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp(0.03 + index * 0.04)}
                    className="rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.20)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
                        <p className="mt-1 text-[13px] leading-6 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.section
              {...fadeUp(0.12)}
              className="mt-4 rounded-[28px] border border-white/85 bg-white/90 p-4 shadow-[0_14px_40px_rgba(37,99,235,0.06)] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Resumen principal
                  </div>
                  <h2 className="mt-1 text-[1.4rem] font-black text-slate-950 sm:text-2xl">
                
                  </h2>
                </div>

                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Activo
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(0.15 + index * 0.03)}
                      className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold leading-4 text-slate-500">
                            {item.label}
                          </div>
                          <div className="mt-3 text-[1.45rem] font-black leading-none text-slate-950 sm:text-[1.8rem]">
                            {item.value}
                          </div>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">
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
              className="mt-4 rounded-[28px] border border-white/85 bg-white/90 p-4 shadow-[0_14px_40px_rgba(37,99,235,0.06)] sm:p-5"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Inventario en pantalla
                  </div>
                  <h2 className="mt-1 text-[1.35rem] font-black text-slate-950 sm:text-2xl">
                    Productos y stock
                  </h2>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Más limpio, más claro y con mejor jerarquía visual para promocionarlo sin que se mire saturado.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px]">
                  <div className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f9fcff_100%)] px-4 py-3.5 shadow-[0_12px_28px_rgba(37,99,235,0.08)]">
                    <Search className="h-4 w-4 text-sky-600" />
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
                    className="min-h-[56px] rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] outline-none"
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
                    {...fadeUp(0.2 + index * 0.02)}
                    className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700">
                          {item.code}
                        </div>
                        <h3 className="mt-1 text-[1rem] font-black leading-6 text-slate-950 sm:text-[1.05rem]">
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
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Stock
                        </div>
                        <div className="mt-1 text-lg font-black text-slate-950">{item.stock}</div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Mínimo
                        </div>
                        <div className="mt-1 text-lg font-black text-slate-950">{item.min}</div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Ubicación
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-950">{item.location}</div>
                      </div>

                      <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-3.5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Valor
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-950">{item.amount}</div>
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
                  <div className="mt-1 text-xl font-black text-slate-950">{totalOptimal}</div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                    Bajos
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-950">{totalLow}</div>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-700">
                    Críticos
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-950">{totalCritical}</div>
                </div>
              </div>
            </motion.section>

            <motion.section
              {...fadeUp(0.22)}
              className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.9fr]"
            >
              <div className="rounded-[28px] border border-white/85 bg-white/90 p-4 shadow-[0_14px_40px_rgba(37,99,235,0.06)] sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      Actividad reciente
                    </div>
                    <h2 className="mt-1 text-[1.35rem] font-black text-slate-950 sm:text-2xl">
                      Movimientos del día
                    </h2>
                  </div>

                  <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                    En tiempo real
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {movements.map((item, index) => (
                    <motion.div
                      key={`${item.product}-${index}`}
                      {...fadeUp(0.24 + index * 0.03)}
                      className="flex items-start justify-between gap-3 rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                    >
                      <div className="min-w-0">
                        <div
                          className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${movementClass(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </div>
                        <div className="mt-2 text-sm font-extrabold text-slate-950">{item.product}</div>
                        <div className="mt-1 text-[13px] text-slate-500">
                          {item.qty} · {item.user}
                        </div>
                      </div>

                      <div className="shrink-0 text-xs font-bold text-slate-500">{item.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/85 bg-white/90 p-4 shadow-[0_14px_40px_rgba(37,99,235,0.06)] sm:p-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Lo que vende
                  </div>
                  <h2 className="mt-1 text-[1.35rem] font-black text-slate-950 sm:text-2xl">
                    ¿Por qué este diseño funciona mejor?
                  </h2>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    "La vista principal ya no se siente saturada.",
                    "Los colores ahora sí se miran serios y modernos.",
                    "El botón principal resalta más y dirige la atención.",
                    "En celular se mira más amplio, limpio y profesional.",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      {...fadeUp(0.26 + index * 0.03)}
                      className="flex items-start gap-3 rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.16)]">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                      </div>
                      <p className="text-[13px] leading-6 text-slate-600">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
        <div className="mx-auto max-w-md rounded-[24px] border border-white/85 bg-white/92 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl">
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
                  className={`rounded-2xl px-3 py-3 text-center text-[11px] font-bold transition ${
                    index === 0
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)]"
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
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-md md:items-center md:p-4"
            onClick={() => setShowMovementModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-[30px] border border-white/85 bg-white p-5 shadow-[0_30px_120px_rgba(15,23,42,0.18)] md:rounded-[30px] md:p-6"
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-200 md:hidden" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700">
                    Inventario
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-slate-950">
                    Registrar movimiento
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Una vista más moderna, limpia y vendible para mostrar control real.
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
                  className="min-h-[52px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowMovementModal(false)}
                  className="min-h-[54px] rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(37,99,235,0.18)]"
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