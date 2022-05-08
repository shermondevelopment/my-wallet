export default async function validation(data, schemaValidation) {
  try {
    const valid = await schemaValidation.validateAsync({...data})
  } catch (error) {
    return error.message
  }
}