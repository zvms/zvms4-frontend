// Declare a module to augment the global 'Window' interface
declare global {
  // Define the shape of the clarity function and any associated properties
  interface Window {
    clarity: {
      (config: { [key: string]: unknown }): void
      q?: IArguments[]
    }
  }
  const Desmos: typeof import('@types/desmos')
}

// This line is necessary if your file doesn't have any imports or exports
export {}
