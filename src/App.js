import AppController from './controllers/AppController.js';

class App {
  async run() {
    const controller = new AppController();
    await controller.process();
  }
}

export default App;
