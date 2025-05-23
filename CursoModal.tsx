const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: ["number", "select-one"].includes(type) && !isNaN(Number(value)) ? Number(value) : value,
  }));
};