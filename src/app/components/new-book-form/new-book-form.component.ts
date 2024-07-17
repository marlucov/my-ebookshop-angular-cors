import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { Book } from '../../types/book';
import { AuthorService } from '../../services/author/author.service';
import { BookService } from '../../services/book/book.service';
import { GenreService } from '../../services/genre/genre.service';
import { PublishingHouseService } from '../../services/publishing-house/publishing-house.service';
import { DisabledButton } from '../../types/disabled-button';
import { Author } from '../../types/author';
import { PublishingHouse } from '../../types/publishing-house';
import { Genre } from '../../types/genre';
import { ItemListElement } from './item-list-element';
import { doNothing } from '../../utils/miscellaneous';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrl: './new-book-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgFor]
})
export class NewBookFormComponent {
  bookToInsert!: Book;

  private resetBookToInsert(): void {
    this.bookToInsert = {
      id: '',
      title: '',
      publishingYear: 0,
      publishingHouseDto: {
        id: '',
        name: '',
        yearOfEstablishment: 0,
        contact: ''
      },
      authorDtoList: [
        {
          id: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          nationality: ''
        }
      ],
      genreDtoList: [
        {
          id: '',
          type: ''
        }
      ],
      price: 0
    };
  }
  //
  readonly keyAuthor: string = 'author';
  readonly keyBook: string = 'book';
  readonly keyGenre: string = 'genre';
  readonly keyPublishingHouse: string = 'publishingHouse';
  //
  items!: {
    [key: string]: undefined | {
      isSelected: boolean;
      wasSelected: boolean;
      label: string;
      list: ItemListElement[];
      simpleKeys: string[];
    }
  };

  private get keys(): string[] {
    return Object.keys(this.items);
  }

  get keysLessBook(): string[] {
    return this.keys.filter((key: string): boolean => (this.keyBook !== key));
  }

  private simpleKeysOf(obj: Object): string[] {
    return Object.keys(obj).filter((key: string): boolean =>
      'id' !== key
      && 'object' !== (typeof obj[key as keyof Object])
    );
  }

  private getSimpleKeys(key: string): string[] {
    return this.items[key]!.simpleKeys;
  }

  private setSimpleKeys(key: string, value: string[]): void {
    this.items[key]!.simpleKeys = value;
  }

  private resetItems(): void {
    this.items = {
      [this.keyAuthor]: undefined,
      [this.keyBook]: undefined,
      [this.keyPublishingHouse]: undefined,
      [this.keyGenre]: undefined
    };
    this.keys.forEach((key: string): void => {
      this.items[key] = {
        isSelected: false,
        wasSelected: false,
        label: '',
        list: [],
        simpleKeys: []
      };
    });
  }

  inputForm!: { [key: string]: FormControl };
  private subFormSelector = '.';

  private generateForm(key: string) {
    this.inputForm[key] = new FormControl({ value: '', disabled: true });
  }

  makeKey(keyForm: string, keySubForm: string): string {
    return (keyForm + this.subFormSelector + keySubForm);
  }

  private generateSubForms(keyForm: string, keysSubForm: string[]) {
    keysSubForm.forEach(key => this.generateForm(this.makeKey(keyForm, key)));
  }

  private resetInputForm(): void {
    this.inputForm = {};
  }

  private isSelected(key: string): boolean {
    return this.items[key]!.isSelected;
  }

  private disableForm(keyForm: string): void {
    this.inputForm[keyForm].disable();
  }

  private enableForm(keyForm: string): void {
    this.inputForm[keyForm].enable();
  }

  private disableSubForms(keyForm: string): void {
    this.getSimpleKeys(keyForm).forEach((key: string): void =>
      this.inputForm[this.makeKey(keyForm, key)].disable()
    );
  }

  private enableSubForms(keyForm: string): void {
    this.getSimpleKeys(keyForm).forEach((key: string): void =>
      this.inputForm[this.makeKey(keyForm, key)].enable()
    );
  }

  private isChangedStatus(key: string): boolean {
    return (this.items[key]!.wasSelected != this.items[key]!.isSelected);
  }

  private updateStatus(key: string): void {
    this.items[key]!.wasSelected = this.items[key]!.isSelected;
    const value: string = this.inputForm[key].value;
    this.items[key]!.isSelected
      = (undefined !== this.items[key]!.list.find(((obj: ItemListElement): boolean => value === obj.id)));
  }

  private adjustStatus(key: string): void {
    this.isSelected(key) ?
      this.disableSubForms(key) :
      this.enableSubForms(key);
  }

  private areSubFormsCompleted(keyForm: string): boolean {
    return this.getSimpleKeys(keyForm).every((key: string): boolean =>
      '' !== this.inputForm[this.makeKey(keyForm, key)].value
    );
  }

  private isCompleted(key: string): boolean {
    return (
      this.isSelected(key) ?
        true :
        (
          ('' === this.inputForm[key].value) ?
            false :
            this.areSubFormsCompleted(key)
        )
    );
  }
  //
  insertButton: DisabledButton = new DisabledButton();

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private genreService: GenreService,
    private publishingHouseService: PublishingHouseService
  ) {
  }

  private reloadItemsLabels(): void {
    this.items[this.keyAuthor]!.label = 'Author(s)';
    this.items[this.keyBook]!.label = 'Title';
    this.items[this.keyGenre]!.label = 'Genre(s)';
    this.items[this.keyPublishingHouse]!.label = 'Publishing House';
  }

  private reloadItemsSimpleKeys(): void {
    this.setSimpleKeys(this.keyAuthor,
      this.simpleKeysOf(this.bookToInsert.authorDtoList[0]).filter((key: string): boolean =>
        'firstName' !== key
        && 'lastName' !== key
      ));
    this.setSimpleKeys(this.keyBook,
      this.simpleKeysOf(this.bookToInsert).filter((key: string): boolean =>
        'title' !== key
      ));
    this.setSimpleKeys(this.keyGenre,
      this.simpleKeysOf(this.bookToInsert.genreDtoList[0]).filter((key: string): boolean =>
        'type' !== key
      ));
    this.setSimpleKeys(this.keyPublishingHouse,
      this.simpleKeysOf(this.bookToInsert.publishingHouseDto).filter((key: string): boolean =>
        'name' !== key
      ));
  }

  private reloadItemsLists(): void {
    this.authorService.getAll().subscribe((data: Author[]): void => {
      this.items[this.keyAuthor]!.list = data.map((obj: Author): ItemListElement =>
        new ItemListElement(obj.id, obj.firstName + ' ' + obj.lastName)
      );
    });
    this.bookService.getAll().subscribe((data: Book[]): void => {
      this.items[this.keyBook]!.list = data.map((obj: Book): ItemListElement =>
        new ItemListElement(obj.id, obj.title)
      );
    });
    this.genreService.getAll().subscribe((data: Genre[]): void => {
      this.items[this.keyGenre]!.list = data.map((obj: Genre): ItemListElement =>
        new ItemListElement(obj.id, obj.type)
      );
    });
    this.publishingHouseService.getAll().subscribe((data: PublishingHouse[]): void => {
      this.items[this.keyPublishingHouse]!.list = data.map((obj: PublishingHouse): ItemListElement =>
        new ItemListElement(obj.id, obj.name)
      );
    });
  }

  private ngOnInit(): void {
    this.resetBookToInsert();
    //
    this.resetItems();
    this.reloadItemsLabels();
    this.reloadItemsSimpleKeys();
    this.reloadItemsLists();
    //
    this.resetInputForm();
    this.keys.forEach((key: string): void => {
      this.generateForm(key);
      this.generateSubForms(key, this.getSimpleKeys(key));
      this.enableForm(key);
      this.enableSubForms(key);
    });
    //
    this.insertButton.disable();
  }

  private disableBookInputs(): void {
    this.keysLessBook.forEach((key: string): void => this.disableForm(key));
    //
    this.keys.forEach((key: string): void => this.disableSubForms(key));
  }

  private enableBookInputs(): void {
    this.enableSubForms(this.keyBook);
    //
    this.keysLessBook.forEach((key: string): void => {
      this.enableForm(key);
      this.adjustStatus(key);
    });
  }

  private adjustStatusBookInputs(): void {
    this.isSelected(this.keyBook) ?
      this.disableBookInputs() :
      this.enableBookInputs();
  }

  private isCompletedBook(): boolean {
    return this.areSubFormsCompleted(this.keyBook)
      && this.keysLessBook.every((key: string): boolean => this.isCompleted(key));
  }

  onInput(key: string): void {
    this.updateStatus(key);
    this.isChangedStatus(key) ?
      this.adjustStatus(key) :
      doNothing();
    this.onInputInsertValidator();
  }

  onInputTitle(): void {
    this.items[this.keyBook]!.wasSelected = this.items[this.keyBook]!.isSelected;
    const title: string = this.bookToInsert.title;
    this.items[this.keyBook]!.isSelected
      = (undefined !== this.items[this.keyBook]!.list
        .find(((obj: ItemListElement): boolean => title === obj.id)));
    this.adjustStatusBookInputs();
    this.onInputInsertValidator();
  }

  onInputInsertValidator(): void {
    this.isSelected(this.keyBook) ?
      this.insertButton.disable() :
      (
        ('' === this.bookToInsert.title) ?
          this.insertButton.disable() :
          (
            this.isCompletedBook() ?
              this.insertButton.enable() :
              this.insertButton.disable()
          )
      );
  }

  onClickInsert(): void {
    this.isSelected(this.keyAuthor) ?
      this.bookToInsert.authorDtoList[0].id = this.inputForm[this.keyAuthor].value :
      (
        this.bookToInsert.authorDtoList[0].firstName
        = (this.inputForm[this.keyAuthor].value as string).split(' ').slice(0, -1).join(' '),
        this.bookToInsert.authorDtoList[0].lastName
        = (this.inputForm[this.keyAuthor].value as string).split(' ').slice(-1)[0],
        this.getSimpleKeys(this.keyAuthor).forEach((key: string): void =>
          this.bookToInsert.authorDtoList[0][key as keyof Object]
          = this.inputForm[this.makeKey(this.keyAuthor, key)].value
        )
      );
    this.isSelected(this.keyGenre) ?
      this.bookToInsert.genreDtoList[0].id = this.inputForm[this.keyGenre].value :
      this.bookToInsert.genreDtoList[0].type = this.inputForm[this.keyGenre].value;
    this.isSelected(this.keyPublishingHouse) ?
      this.bookToInsert.publishingHouseDto.id = this.inputForm[this.keyPublishingHouse].value :
      (
        this.bookToInsert.publishingHouseDto.name = this.inputForm[this.keyPublishingHouse].value,
        this.getSimpleKeys(this.keyPublishingHouse).forEach((key: string): void =>
          this.bookToInsert.publishingHouseDto[key as keyof Object]
          = this.inputForm[this.makeKey(this.keyPublishingHouse, key)].value
        )
      );
    this.getSimpleKeys(this.keyBook).forEach((key: string): void =>
      this.bookToInsert[key as keyof Object] = this.inputForm[this.makeKey(this.keyBook, key)].value
    );
    this.bookService.insert(this.bookToInsert).subscribe((): void => {
      this.ngOnInit();
    });
  }
}
