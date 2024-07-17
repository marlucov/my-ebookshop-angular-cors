// links
export const backendLink: string = "http://localhost:8080/";
export const addBookLink: string = `${backendLink}api/add_book`;
export const authorsLink: string = `${backendLink}api/all_authors`;
export const booksLink: string = `${backendLink}api/all_books`;
export const cartLink: string = `${backendLink}api/cart`;
export const deleteBookLink: string = `${backendLink}api/delete_book`;
export const genresLink: string = `${backendLink}api/all_genres`;
export const getBookPagesLink: string = `${backendLink}api/book_pages`;
export const insertBookLink: string = `${backendLink}api/insert_book`;
export const loginLink: string = `${backendLink}login`;
export const logoutLink: string = `${backendLink}logout`;
export const publishingHousesLink: string = `${backendLink}api/all_publishing_houses`;
export const removeBookLink: string = `${backendLink}api/remove_book`;
export const userLink: string = `${backendLink}api/crt_user`;
export const usersLink: string = `${backendLink}api/all_users`;
// paths
export const authorizationPath: string = "";
export const logoutPath: string = "logout";
export const rootPath: string = "root";
//   root's children
export const booksPath: string = "books";
export const cartPath: string = "cart";
export const deleteBookPath: string = "delete_book";
export const homePath: string = "home";
export const insertBookPath: string = "insert_book";
export const usersPath: string = "users";
//   end <root's children>
// routes
const route = (prefix: string, path: string): string => `${prefix}/${path}`;
export const routeFrom = (path: string): string => route('/', path);
//   root's children
export const rootPrefix: string = (0 == rootPath.length) ? "" : routeFrom(rootPath);
export const routeRootChild = (childPath: string): string => route(rootPrefix, childPath);
//   end <root's children>
