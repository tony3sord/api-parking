export class Parking {
  id: number;
  name: string;
  address: string;
  capacity: number;
  availableSpaces: number;
  pricePerHour: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    address: string,
    capacity: number,
    availableSpaces: number,
    pricePerHour: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.availableSpaces = availableSpaces;
    this.pricePerHour = pricePerHour;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
