/*
The router defines the valid paths for the site and their
corresponding components. So if the user goes to synthase.io/dashboard,
the dashboard component is loaded.
 */

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppNav from '@/components/AppNav'
import Register from '@/components/Register'
import SearchResults from '@/components/SearchResults/SearchResults'
import Dashboard from '@/components/Dashboard/Dashboard'
import AdvancedSearch from '@/components/AdvancedSearch/AdvancedSearch'
import ManageThreats from '@/components/ManageThreats/ManageThreats'
import ManageSources from '@/components/ManageSources/ManageSources'
import Help from '@/components/Help'

import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dash',
      component: Dashboard
    },
    {
      path: '/search-results',
      name: 'results',
      component: SearchResults
    },
    {
      path: '/search/perma',
      name: 'perma',
      component: SearchResults
    },
    {
      path: '/advanced-search',
      name: 'advanced-search',
      component: AdvancedSearch
    },
    {
      path: '/manage-threats',
      name: 'manage-threats',
      component: ManageThreats
    },
    {
      path: '/manage-sources',
      name: 'manage-sources',
      component: ManageSources
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})
