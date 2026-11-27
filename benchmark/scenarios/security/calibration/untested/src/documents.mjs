export class NotFoundError extends Error {}

// Returns the document with `id` for an authenticated caller ({ tenantId }).
export function readDocument(documents, caller, id) {
  const document = documents.find((candidate) => candidate.id === id);
  if (!document || !caller?.tenantId || document.tenantId !== caller.tenantId)
    throw new NotFoundError(`document ${id} not found`);
  return document;
}
