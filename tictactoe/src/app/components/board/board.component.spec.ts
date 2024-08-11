import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('new game is open',()=>{
    const boardElement: HTMLElement = fixture.nativeElement;
    expect(boardElement.textContent).toContain('Current player: X');
  })

  it("2nd player is in row", ()=> {
    component.xIsNext=false;
    const boardElement: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const h1 = boardElement.querySelector('H1')!;
    expect(h1.textContent).toContain('Current player: O');
    component.xIsNext=true;
    fixture.detectChanges();
    expect(h1.textContent).toContain('Current player: X');
  })

});
