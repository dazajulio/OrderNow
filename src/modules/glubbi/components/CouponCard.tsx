import React from 'react';

export default function CouponCard() {
  return (
    <div className="relative w-full h-72 rounded-[2rem] overflow-hidden bg-gradient-to-br from-orange-400 to-rose-600 p-6 flex flex-col justify-between shadow-xl mb-6">
      {/* Wave / Tiger pattern background overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c13.866 0 25.362 10.24 26.816 23.63L38 42c0-14.36-11.64-26-26-26v2zm-2 0v-2C22.36 16 34 27.64 34 42h-2c0-12.703-10.297-23-23-23zm24 24h2C35 27.64 46.64 16 61 16v2c-12.703 0-23 10.297-23 23zm-2 0c0-14.36 11.64-26 26-26v2c-12.703 0-23 10.297-23 23h-2zm24 0h2C59 27.64 70.64 16 85 16v2c-12.703 0-23 10.297-23 23zm-2 0c0-14.36 11.64-26 26-26v2c-12.703 0-23 10.297-23 23h-2zm24 0h2C83 27.64 94.64 16 109 16v2c-12.703 0-23 10.297-23 23zm-2 0c0-14.36 11.64-26 26-26v2c-12.703 0-23 10.297-23 23h-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}></div>

      <div className="relative z-10">
        {/* Bubble */}
        <div className="bg-white rounded-full px-4 py-2 inline-flex items-center gap-2 mb-4 shadow-sm">
          <span className="text-orange-600 font-extrabold text-sm tracking-tight">¿Hambre de bienvenida? 🍔</span>
        </div>

        {/* Text */}
        <h2 className="text-white text-3xl font-light leading-none">Tu primer</h2>
        <h1 className="text-white text-5xl font-black mt-1 leading-none tracking-tighter drop-shadow-md">
          <span className="text-xs font-bold inline-block -rotate-90 origin-bottom-right mr-1 -ml-3">GRATIS</span>
          DELIVERY
        </h1>
      </div>

      {/* T&C */}
      <div className="relative z-10 mt-auto">
        <p className="text-white/80 text-[10px] leading-tight max-w-[70%]">
          Aplica términos y condiciones. Válido únicamente en tu primera compra en Glubbi.
        </p>
      </div>

      {/* Image positioning (mock burger/fries) */}
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-contain bg-no-repeat bg-center pointer-events-none drop-shadow-2xl z-20" style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80")`,
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
      }}>
      </div>
    </div>
  );
}
