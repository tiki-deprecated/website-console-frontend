<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <chart-basic-bar :data="data" :key="updated" />
  </div>
</template>

<script setup lang="ts">
import { Registry } from '~/plugins/registry'
import { UsageRsp } from '~/plugins/registry/usage-rsp'
import { Profile } from '~/plugins/account'

const registry: Registry = useNuxtApp().$registry()
const profile: Profile = useNuxtApp().$profile()
const updated = ref(0)
const updateChart = () => (updated.value = updated.value + 1)
const data = {
  labels: [],
  datasets: [],
}

registry.getUsage().then(async (usage) => {
  const usageMap: Map<number, UsageRsp> = new Map()
  const appIds = new Set<String>()
  const dataMap: Map<string, Array<number>> = new Map()

  usage.forEach((u) => {
    u.apps.forEach((app) => {
      appIds.add(app.appId)
    })
    usageMap.set(new Date(u.date).getTime(), u)
  })

  for (let i = 29; i >= 0; i--) {
    let dateLabel = new Date()
    dateLabel.setUTCHours(0, 0, 0, 0)
    dateLabel.setDate(dateLabel.getDate() - i)
    const use = usageMap.get(dateLabel.getTime())

    appIds.forEach((id) => {
      let data: Array<number> | undefined = dataMap.get(id)
      if (data == undefined) data = [Number.NaN]
      else data.push(Number.NaN)
      dataMap.set(id, data)
    })

    use?.apps.forEach((app) => {
      let data: Array<number> | undefined = dataMap.get(app.appId)
      data!.pop()
      data!.push(app.total)
      dataMap.set(app.appId, data!)
    })

    data.labels.push(
      dateLabel.toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'numeric',
      })
    )
  }
  // dataMap.forEach((value, key) => {
  //   data.datasets.push({
  //     label: key,
  //     data: value,
  //   })
  // })
  //`updateChart()

  const appNameMap: Map<string, string> = new Map()
  for (const id of appIds) {
    const app = await profile.getApp(id).then()
    appNameMap.set(id, app.name)
  }
  //data.datasets = []
  dataMap.forEach((value, key) => {
    data.datasets.push({
      label: appNameMap.get(key),
      data: value,
    })
  })
  updateChart()
})
</script>

<style scoped></style>
