"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  ClipboardList,
  LayoutGrid,
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
    label: "Valor total en inventario",
    value: "Q 284,900",
    change: "+8.4%",
    trend: "up",
    icon: Warehouse,
    note: "vs mes anterior",
  },
  {
    label: "Productos registrados",
    value: "1,248",
    change: "+124",
    trend: "up",
    icon: Package,
    note: "catálogo activo",
  },
  {
    label: "Alertas críticas",
    value: "06",
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
    note: "requieren atención",
  },
  {
    label: "Movimientos del día",
    value: "326",
    change: "+23%",
    trend: "up",
    icon: Activity,
    note: "entradas y salidas",
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

const ringData = [
  { label: "Disponibilidad", value: "96%" },
  { label: "Precisión", value: "99.2%" },
  { label: "Rotación", value: "87%" },
];

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
  if (type === "Entrada") return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (type === "Salida") return "text-sky-700 bg-sky-50 border-sky-200";
  if (type === "Ajuste") return "text-violet-700 bg-violet-50 border-violet-200";
  return "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200";
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, delay },
  };
}

export default function DemoControlInventario() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [activeSection, setActiveSection] = useState("Dashboard");
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
    <div className="min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_22%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.20),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_24%),linear-gradient(to_bottom,#f9fcff,#eef7ff,#fef6ff,#fff9ed)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <div className="pointer-events-none fixed inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_42%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-5 lg:px-8 lg:py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.985, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[26px] border border-white/70 bg-white/72 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[34px]"
        >
          <div className="border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-amber-400/10 px-3 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_0_30px_rgba(34,211,238,0.14)] sm:h-16 sm:w-16">
                  <Image
                    src="/img/logo.png"
                    alt="VentasTotal"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    <h1 className="bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 bg-clip-text text-2xl font-black leading-none text-transparent sm:text-[2.2rem]">
                      VentasTotal
                    </h1>
                    <span className="inline-flex w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-700 sm:text-xs">
                      Sistema de ventas e inventario
                    </span>
                  </div>

                  <p className="mt-2 max-w-3xl text-[13px] leading-5 text-slate-600 sm:text-sm sm:leading-6">
                    Controla stock, movimientos, alertas, sucursales y reportes desde
                    una sola plataforma con una imagen moderna, atractiva y lista para vender.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Exportar PDF
                </button>

                <button
                  onClick={() => setShowMovementModal(true)}
                  className="w-full rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(168,85,247,0.22)] transition hover:scale-[1.02]"
                >
                  Nuevo movimiento
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-cyan-200 bg-cyan-50/90 p-4">
                <div className="flex items-center gap-2 text-cyan-700">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">Más control</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Todo el inventario visible en tiempo real.
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50/90 p-4">
                <div className="flex items-center gap-2 text-fuchsia-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">Imagen premium</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Diseño moderno para causar mejor impresión.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Boxes className="h-4 w-4" />
                  <span className="text-sm font-semibold">Ideal para ventas</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Perfecto para mostrar orden, rapidez y control frente a tus clientes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-[280px_1fr]">
            <aside className="border-b border-slate-200/80 bg-white/45 p-3 sm:p-4 xl:border-b-0 xl:border-r">
              <div className="rounded-[24px] border border-white/70 bg-white/75 p-3 shadow-[0_14px_36px_rgba(15,23,42,0.06)] sm:rounded-[26px] sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-fuchsia-100 sm:h-11 sm:w-11">
                    <LayoutGrid className="h-5 w-5 text-cyan-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900">Panel principal</div>
                    <div className="text-xs text-slate-500">Vista administrativa</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-1 sm:space-y-0">
                  {[
                    [LayoutGrid, "Dashboard"],
                    [Package, "Inventario"],
                    [ClipboardList, "Movimientos"],
                    [Truck, "Transferencias"],
                    [ShieldCheck, "Auditoría"],
                    [Warehouse, "Sucursales"],
                  ].map(([Icon, label]) => {
                    const ActiveIcon = Icon as typeof LayoutGrid;
                    const active = activeSection === label;

                    return (
                      <button
                        key={label as string}
                        onClick={() => setActiveSection(label as string)}
                        className={`flex min-h-[52px] w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition sm:px-4 ${
                          active
                            ? "border border-fuchsia-200 bg-gradient-to-r from-cyan-50 via-fuchsia-50 to-amber-50 text-slate-900 shadow-[0_8px_22px_rgba(34,211,238,0.10)]"
                            : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/70"
                        }`}
                      >
                        <ActiveIcon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{label as string}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/70 bg-gradient-to-br from-cyan-50 via-fuchsia-50 to-amber-50 p-3 shadow-[0_14px_36px_rgba(15,23,42,0.06)] sm:rounded-[26px] sm:p-4">
                <div className="text-sm font-bold text-slate-900">Estado operativo</div>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Sistema estable, inventario sincronizado y alertas activas en tiempo real.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Sección activa
                    </div>
                    <div className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">{activeSection}</div>
                  </div>

                  {ringData.map((item, index) => {
                    const glow =
                      index === 0
                        ? "text-cyan-700"
                        : index === 1
                        ? "text-fuchsia-700"
                        : "text-amber-700";

                    return (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {item.label}
                        </div>
                        <div className={`mt-2 text-xl font-black sm:text-2xl ${glow}`}>{item.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="p-3 sm:p-4 lg:p-6">
              <motion.section
                {...fadeUp(0.05)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4"
              >
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  const isUp = item.trend === "up";

                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(index * 0.05)}
                      className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[28px] sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs text-slate-500 sm:text-sm">{item.label}</div>
                          <div className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:mt-3 sm:text-3xl">
                            {item.value}
                          </div>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-amber-100 sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5 text-cyan-700" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold sm:text-xs ${
                            isUp ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {isUp ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                          )}
                          {item.change}
                        </div>

                        <div className="text-[11px] text-slate-500 sm:text-xs">{item.note}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.section>

              <div className="mt-4 grid gap-4 2xl:grid-cols-[1.45fr_0.88fr] sm:mt-5 sm:gap-5">
                <motion.section
                  {...fadeUp(0.08)}
                  className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Inventario general</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Vista ordenada para productos, stock actual, mínimos, ubicación y valor estimado.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row">
                      <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                        <Search className="h-4 w-4 shrink-0 text-cyan-600" />
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Buscar producto, código o categoría"
                          className="w-full min-w-0 bg-transparent outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none shadow-sm md:w-[180px]"
                      >
                        <option>Todos</option>
                        <option>Óptimo</option>
                        <option>Bajo</option>
                        <option>Crítico</option>
                      </select>
                    </div>
                  </div>

                  {/* móvil */}
                  <div className="mt-5 space-y-3 md:hidden">
                    {filteredInventory.map((item) => (
                      <div
                        key={item.code}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-cyan-700">{item.code}</div>
                            <div className="mt-1 text-sm font-semibold text-slate-900">
                              {item.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{item.category}</div>
                          </div>

                          <span
                            className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${statusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                          <div className="rounded-xl bg-slate-50 p-3">
                            <div className="text-[11px] text-slate-500">Stock</div>
                            <div className="mt-1 font-bold text-slate-900">{item.stock}</div>
                          </div>
                          <div className="rounded-xl bg-slate-50 p-3">
                            <div className="text-[11px] text-slate-500">Mínimo</div>
                            <div className="mt-1 font-bold text-slate-900">{item.min}</div>
                          </div>
                          <div className="col-span-2 rounded-xl bg-slate-50 p-3">
                            <div className="text-[11px] text-slate-500">Ubicación</div>
                            <div className="mt-1 font-medium text-slate-900">{item.location}</div>
                          </div>
                          <div className="col-span-2 rounded-xl bg-slate-50 p-3">
                            <div className="text-[11px] text-slate-500">Valor</div>
                            <div className="mt-1 font-bold text-slate-900">{item.amount}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* escritorio */}
                  <div className="mt-5 hidden overflow-hidden rounded-[24px] border border-slate-200 md:block">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                          <tr>
                            <th className="px-4 py-4">Código</th>
                            <th className="px-4 py-4">Producto</th>
                            <th className="px-4 py-4">Categoría</th>
                            <th className="px-4 py-4">Stock</th>
                            <th className="px-4 py-4">Mínimo</th>
                            <th className="px-4 py-4">Estado</th>
                            <th className="px-4 py-4">Ubicación</th>
                            <th className="px-4 py-4">Valor</th>
                          </tr>
                        </thead>

                        <tbody className="bg-white/80">
                          {filteredInventory.map((item, index) => (
                            <tr
                              key={item.code}
                              className={`transition hover:bg-sky-50/60 ${
                                index !== filteredInventory.length - 1 ? "border-b border-slate-200" : ""
                              }`}
                            >
                              <td className="px-4 py-4 text-sm font-semibold text-cyan-700">
                                {item.code}
                              </td>
                              <td className="px-4 py-4">
                                <div className="font-semibold text-slate-900">{item.name}</div>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-600">{item.category}</td>
                              <td className="px-4 py-4 text-sm font-bold text-slate-900">{item.stock}</td>
                              <td className="px-4 py-4 text-sm text-slate-600">{item.min}</td>
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusClass(
                                    item.status
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-600">{item.location}</td>
                              <td className="px-4 py-4 text-sm font-semibold text-slate-900">{item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                        Óptimos
                      </div>
                      <div className="mt-2 text-2xl font-black text-slate-900">{totalOptimal}</div>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-amber-700">Bajos</div>
                      <div className="mt-2 text-2xl font-black text-slate-900">{totalLow}</div>
                    </div>

                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-rose-700">
                        Críticos
                      </div>
                      <div className="mt-2 text-2xl font-black text-slate-900">{totalCritical}</div>
                    </div>
                  </div>
                </motion.section>

                <div className="space-y-4 sm:space-y-5">
                  <motion.section
                    {...fadeUp(0.12)}
                    className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Alertas operativas</h2>
                        <p className="mt-1 text-sm text-slate-600">
                          Información clave para evitar faltantes y errores de control.
                        </p>
                      </div>

                      <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
                        3 activas
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {alerts.map((alert, index) => (
                        <div
                          key={alert}
                          className={`rounded-2xl border p-4 text-sm ${
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
                    {...fadeUp(0.16)}
                    className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-5"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Rendimiento semanal</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Actividad reciente de movimientos y operación logística.
                      </p>
                    </div>

                    <div className="mt-5 rounded-[22px] border border-slate-200 bg-white p-4 sm:mt-6 sm:rounded-[24px] sm:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-700">
                          Actividad logística
                        </span>
                        <span className="text-xs text-fuchsia-600">Últimos 7 días</span>
                      </div>

                      <div className="flex h-44 items-end justify-between gap-2 sm:h-56 sm:gap-3">
                        {weeklyBars.map((height, i) => (
                          <div key={i} className="flex w-full flex-col items-center gap-2 sm:gap-3">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              whileInView={{ height: `${height}%`, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                              className="w-full rounded-t-[14px] bg-gradient-to-t from-cyan-500 via-fuchsia-500 to-amber-400 shadow-[0_12px_32px_rgba(168,85,247,0.16)] sm:rounded-t-[18px]"
                            />
                            <span className="text-[11px] text-slate-500">{weeklyLabels[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                </div>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr] sm:mt-5 sm:gap-5">
                <motion.section
                  {...fadeUp(0.14)}
                  className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Movimientos recientes</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Entradas, salidas, ajustes y transferencias.
                      </p>
                    </div>

                    <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 sm:block">
                      En vivo
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {movements.map((move, index) => (
                      <motion.div
                        key={`${move.type}-${move.product}-${index}`}
                        {...fadeUp(index * 0.04)}
                        className="flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-white p-4 sm:rounded-[24px] md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold sm:text-xs ${movementClass(
                              move.type
                            )}`}
                          >
                            {move.type}
                          </span>

                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900">{move.product}</div>
                            <div className="mt-1 text-xs text-slate-500">
                              Responsable: {move.user} · {move.time}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm font-black text-slate-900 sm:text-base">{move.qty}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  {...fadeUp(0.18)}
                  className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-5"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Vista ejecutiva</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Una composición premium para comunicar orden, control y confianza.
                      </p>
                    </div>

                    <div className="text-sm font-medium text-fuchsia-600">
                      Actualizado hace 2 min
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white p-4 sm:rounded-[26px] sm:p-5">
                      <div className="text-sm text-cyan-700">Disponibilidad operativa</div>
                      <div className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">94%</div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Inventario mejor organizado, menor riesgo de faltantes y decisiones más rápidas.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-violet-50 to-white p-4 sm:rounded-[26px] sm:p-5">
                      <div className="text-sm text-fuchsia-700">Órdenes procesadas</div>
                      <div className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">1,532</div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Flujo más claro entre compras, ventas, bodega y control administrativo.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-slate-200 bg-white p-4 sm:rounded-[26px] sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Centros de operación
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          Monitoreo por sucursal
                        </div>
                      </div>

                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
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
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:gap-4 sm:p-4"
                        >
                          <div className="h-3 w-3 shrink-0 rounded-full bg-fuchsia-500 shadow-[0_0_18px_rgba(217,70,239,0.35)]" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-slate-900">{name}</div>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400"
                                style={{ width: value }}
                              />
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">{value}</div>
                            <div className="text-[11px] text-slate-500 sm:text-xs">{status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              </div>
            </main>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMovementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/35 p-0 backdrop-blur-md sm:items-center sm:p-4"
            onClick={() => setShowMovementModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-white/80 bg-white p-4 shadow-[0_30px_120px_rgba(15,23,42,0.18)] sm:max-w-2xl sm:rounded-[30px] sm:p-6"
            >
              <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-200 sm:hidden" />

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-700">
                    Inventario
                  </div>
                  <h3 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">
                    Registrar nuevo movimiento
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Registra entradas, salidas y ajustes de forma clara y rápida.
                  </p>
                </div>

                <button
                  onClick={() => setShowMovementModal(false)}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowMovementModal(false)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowMovementModal(false)}
                  className="w-full rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
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