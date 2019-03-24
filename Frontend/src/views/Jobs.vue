<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>{{ $t('title') }}</th>
        <th>{{ $t('employer') }}</th>
        <th>{{ $t('description') }}</th>
        <th>{{ $t('salary') }}</th>
        <th>{{ $t('workLocation') }}</th>
        <th>{{ $t('requiredSkills') }}</th>
        <th>{{ $t('dateDeposited') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(job, index) in jobs" :key="'job-'  + index">
        <td>{{ job.title }}</td>
        <td>{{ job.employer }}</td>
        <td>{{ job.descriptionFr }}</td>
        <td>{{ job.salary }}</td>
        <td>{{ job.workLocation }}</td>
        <td>{{ job.requiredSkills }}</td>
        <td>{{ job.dateDeposited }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Jobs',
  computed: {
    ...mapState([
      'jobs'
    ])
  },
  created () {
    this.$store.dispatch('getJobs')
  }
}
</script>

<style>

</style>
