import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product, Brand, Category } from './product.service';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve product list with pagination', () => {
    const mockResponse = {
      status: 'success',
      data: [
        { id: 1, name: 'Sauvage', price: 120, brandName: 'Dior' },
        { id: 2, name: 'Aventus', price: 350, brandName: 'Creed' }
      ]
    };

    service.getProducts('all', 0, 10).subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Sauvage');
    });

    const req = httpMock.expectOne(`${API_URL}/perfumes/publicos?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a single product by ID', () => {
    const mockProduct = {
      id: 5,
      name: 'Black Orchid',
      brandName: 'Tom Ford',
      price: 180,
      description: 'Fragancia oriental lujosa'
    };

    service.getProductById(5).subscribe(product => {
      expect(product.id).toBe(5);
      expect(product.name).toBe('Black Orchid');
      expect(product.brandName).toBe('Tom Ford');
    });

    const req = httpMock.expectOne(`${API_URL}/perfumes/publicos/5`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should retrieve public categories', () => {
    const mockCategories = [
      { id: 1, name: 'Amaderado' },
      { id: 2, name: 'Floral' }
    ];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories[0].name).toBe('Amaderado');
    });

    const req = httpMock.expectOne(`${API_URL}/categories/public`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'success', data: mockCategories });
  });
});
