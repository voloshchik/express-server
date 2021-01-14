console.log('app');
const App = {
  data() {
    return {
      servers: [],
      name: '',
    };
  },
  methods: {
    async createServer() {
      const data = {
        name: this.name,
        status: 'created',
      };
      console.log('submit');
      const res = await fetch('/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newServer = await res.json();
      console.log('newServer', newServer);
      this.servers.push(newServer);
    },
    remove(id) {
      console.log('delete');
      fetch(`/api/server/${id}`, { method: 'DELETE' });
      this.servers = this.servers.filter((s) => s.id !== id);
    },
  },
  async mounted() {
    const res = await fetch('/api/server');
    this.servers = await res.json();
  },
};
Vue.createApp(App).mount('#app');
