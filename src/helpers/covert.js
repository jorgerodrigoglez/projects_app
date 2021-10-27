// funcion para formatear moneda
const formatCurrency = amount => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  export default formatCurrency;