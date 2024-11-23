import CarController from './controllers/CarController.js';

class App {
  async run() {
    const controller = new CarController();
    await controller.process();
  }
}

export default App;
