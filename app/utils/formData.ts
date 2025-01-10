export const convertJsonToFormData = (json: Record<string, any>) => {
  const formData = new FormData();

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      formData.append(key, value);
    }
  }

  return formData;
};
