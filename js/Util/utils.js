export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getCurrentDateTime = () => {
  return new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const closeModal = (modal) => {
  modal.style.display = "none";
  modal.classList.remove("show");
};

export const generateProductId = (products) => {
  const existingIds = products.map((product) => product.id);

  // Check if using SP format
  const spPattern = /^SP\d+$/;
  const hasSPFormat = existingIds.some((id) => spPattern.test(id));

  if (hasSPFormat) {
    // Find highest SP number and increment
    const spIds = existingIds.filter((id) => spPattern.test(id));
    let highestNum = 0;

    if (spIds.length > 0) {
      highestNum = Math.max(
        ...spIds.map((id) => parseInt(id.replace("SP", "")))
      );
    }

    const newNum = highestNum + 1;
    return `SP${newNum.toString().padStart(6, "0")}`;
  } else {
    // For numeric IDs
    const numericIds = existingIds.filter((id) => !isNaN(parseInt(id)));
    if (numericIds.length > 0) {
      const newId = Math.max(...numericIds.map((id) => parseInt(id))) + 1;
      return newId.toString();
    } else {
      return "1"; // Default start
    }
  }
};

export const existingProductCode = (products) => {
  const existingCodes = products.map((product) => product.productCode);
  return existingCodes;
};
