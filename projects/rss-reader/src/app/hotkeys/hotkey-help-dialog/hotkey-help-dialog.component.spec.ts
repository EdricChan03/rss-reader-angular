import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { HotkeyHelpDialogComponent } from './hotkey-help-dialog.component';

describe('HotkeyHelpDialogComponent', () => {
  let component: HotkeyHelpDialogComponent;
  let fixture: ComponentFixture<HotkeyHelpDialogComponent>;

  const hotkeyData = new Map<string, string>([
    ['shift.enter', 'Hotkey no. 1'],
    ['arrowup', 'Description goes here'],
    ['R', 'Hotkey which is invoked when pressing r']
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotkeyHelpDialogComponent],
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: hotkeyData },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeyHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should retrieve the hotkeys from the specified data', () => {
    const hotkeys = component.hotkeys;
    expect(hotkeys.length).toEqual(hotkeyData.size);
    expect(hotkeys).toEqual(Array.from(hotkeyData));
  });

  it('should render a table with an appropriate number of rows', () => {
    const helpDialogElement: HTMLElement = fixture.nativeElement;
    const trRows = helpDialogElement.querySelectorAll('tr');
    expect(trRows.length).toEqual(hotkeyData.size + 1); // 1 is added for the table header
  });

  // TODO: Add testing for option key
  describe('#getDisplayedShortcut', () => {
    it('should return the same char when an alphanumerical char is specified', () => {
      const letter = String.fromCharCode(Math
        .floor(Math.random() * 26) + 97);
      const result = component.getDisplayedShortcut(letter);
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(letter);

      const num = Math.floor(Math.random() * 10).toString();
      const newResult = component.getDisplayedShortcut(num);
      expect(newResult.length).toEqual(1);
      expect(newResult[0]).toEqual(num);
    });

    it('should return a lower-case char if an upper-case char is specified', () => {
      const letter = 'A';
      const result = component.getDisplayedShortcut(letter);
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(letter.toLocaleLowerCase());
    });

    it('should return an array when more than one hotkey is specified', () => {
      const hotkey = 'meta.r';
      const hotkeyArr = hotkey.split('.');
      const result = component.getDisplayedShortcut(hotkey);
      expect(result.length).toEqual(hotkeyArr.length);
    });

    // Special-case scenarios
    it('should return Command, ↑ when meta.arrowup is specified', () => {
      const result = component.getDisplayedShortcut('meta.arrowup');
      expect(result.length).toEqual(2);
      expect(result).toEqual(['Command', '↑']);
    });

    it('should return Alt/Option, Esc when alt.esc is specified', () => {
      const isMac = window.navigator.platform === 'MacIntel';
      const result = component.getDisplayedShortcut('alt.esc');
      expect(result.length).toEqual(2);
      expect(result).toEqual([isMac ? 'Option' : 'Alt', 'Esc']);
    });

    it('should return F12 when f12 is specified', () => {
      const result = component.getDisplayedShortcut('f12');
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual('F12');
    });
  });
});
