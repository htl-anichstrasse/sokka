declare class Order {
    id: number
    user_id: number
    timestamp: Date
    rebate: number
    state: 'VALID' | 'INVALIDATED'
    menuOrders: MenuOrder[]
    productOrders: ProductOrder[]
}
