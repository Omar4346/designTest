import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialService } from './credential-service';

describe('CredentialService', () => {
  let component: CredentialService;
  let fixture: ComponentFixture<CredentialService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialService],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
