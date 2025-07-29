import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'
import Terms from '@/pages/Terms.vue'
import Privacy from '@/pages/Privacy.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // Always scroll to top on route change
    return { top: 0, left: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        titleKey: 'home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        titleKey: 'about'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        titleKey: 'contact'
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
      meta: {
        titleKey: 'terms'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy,
      meta: {
        titleKey: 'privacy'
      }
    },
  ],
})

// Update document title on route change
// Note: The actual i18n translation will be handled by a composable in components
router.beforeEach((to) => {
  // Get the title key from route meta
  const titleKey = to.meta?.titleKey as string
  
  if (titleKey) {
    // Set a default English title that will be updated by the component's i18n
    document.title = titleKey === 'home' ? 'Giba - Full Stack Developer' : `${titleKey.charAt(0).toUpperCase() + titleKey.slice(1)} - Giba`
  }
})

export default router
