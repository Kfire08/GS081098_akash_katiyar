Deployed Website: https://gsynergy-data-viewer.web.app

## Running and Testing the Code

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/data-viewer.git
   cd data-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server with hot module replacement (HMR):

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

### Manual Testing

Since automated tests are not set up, follow these steps for manual testing:

1. **Start the Development Server**: Run the development server using `npm run dev`.
2. **Open the Application**: Open your web browser and navigate to port mentioned in terminal.
3. **Verify Functionality**: Manually verify the functionality of the application by interacting with different components and features.
4. **Check Console for Errors**: Open the browser's developer console and check for any errors or warnings.
5. **Test Different Scenarios**: Test various scenarios, such as adding, updating, and deleting data, to ensure the application behaves as expected.

## Achievements

### Elements Done Well

1. **TypeScript Integration**: The project is fully typed with TypeScript, ensuring type safety and reducing runtime errors. This demonstrates proficiency in using TypeScript with React and Vite.
2. **State Management with Zustand**: Efficiently managing state using Zustand, which is lightweight and easy to use. This shows the ability to choose and implement appropriate state management solutions.
3. **Dynamic Column Generation**: The dynamic generation of columns in the `Planning` component based on configuration. This highlights the ability to create flexible and scalable components.

### Improvements with More Time

1. **Enhanced Error Handling**: Implement more robust error handling throughout the application to improve user experience and debugging.
2. **Unit and Integration Tests**: Increase test coverage by adding more unit and integration tests to ensure the reliability of the application.
3. **Performance Optimization**: Optimize the performance of the application, especially in the `Planning` component, by implementing memoization and other performance enhancement techniques.
4. **Documentation**: Expand the documentation to include more detailed explanations of the codebase, architecture, and design decisions to make it easier for new developers to onboard.

These improvements would enhance the overall quality, maintainability, and performance of the application.
