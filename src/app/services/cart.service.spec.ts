import { TestBed } from '@angular/core/testing';
import { CartService, CartItem } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const mockProduct = {
    id: 101,
    name: 'Bleu de Chanel',
    description: 'Fragancia aromática amaderada',
    price: 150,
    imageUrl: 'assets/images/placeholder.jpg',
    brandName: 'Chanel',
    sizeMl: 100
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created and start with empty cart', (done) => {
    expect(service).toBeTruthy();
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      expect(service.getCartTotal()).toBe(0);
      done();
    });
  });

  it('should add item to cart and calculate total correctly', (done) => {
    service.addToCart(mockProduct, 2);

    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].id).toBe(101);
      expect(items[0].quantity).toBe(2);
      expect(service.getCartTotal()).toBe(300);
      done();
    });
  });

  it('should increment quantity if same product is added again', () => {
    service.addToCart(mockProduct, 1);
    service.addToCart(mockProduct, 2);

    expect(service.getCartTotal()).toBe(450);
  });

  it('should update quantity and remove item when quantity is 0', (done) => {
    service.addToCart(mockProduct, 2);
    service.updateQuantity(101, 1);
    expect(service.getCartTotal()).toBe(150);

    service.updateQuantity(101, 0);
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      expect(service.getCartTotal()).toBe(0);
      done();
    });
  });

  it('should clear cart on clearCart()', (done) => {
    service.addToCart(mockProduct, 3);
    expect(service.getCartTotal()).toBe(450);

    service.clearCart();
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      expect(service.getCartTotal()).toBe(0);
      done();
    });
  });
});
