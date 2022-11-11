/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

const axios = require('axios').default
const server = 'https://storage.l0.mytiki.com/api/latest'

export async function getIds(token) {
  return await pageIds(token, 0, 100, [])
}

async function pageIds(token, page, size, elements) {
  const response = await axios
    .request({
      method: 'get',
      url: '/api-id',
      baseURL: server,
      headers: {
        Authorization: token,
      },
    })
    .catch((error) => {
      throw new Error(error)
    })
  elements = elements.concat(response.data.elements)
  if (response.data.totalPages > response.data.page + 1) {
    return pageIds(token, page + 1, size, elements)
  } else return elements
}

export async function generate(token) {
  await axios
    .request({
      method: 'post',
      url: '/api-id/new',
      baseURL: server,
      headers: {
        Authorization: token,
      },
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export async function revoke(token, apiId) {
  await axios
    .request({
      method: 'delete',
      url: '/api-id/id/' + apiId,
      baseURL: server,
      headers: {
        Authorization: token,
      },
    })
    .catch((error) => {
      throw new Error(error)
    })
}
