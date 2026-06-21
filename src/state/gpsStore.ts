let driverLocation: any = null;
let listeners: any[] = [];

export function setDriverLocation(loc: any) {
  driverLocation = loc;
  listeners.forEach(fn => fn(loc));
}

export function subscribeDriverLocation(fn: (loc: any) => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function getDriverLocation() {
  return driverLocation;
}
