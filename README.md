[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# API for alaclick.gourmet.at

Usage example:
```Typescript
import { GourmetAPI } from "gourmet-api";

const api = new GourmetAPI();

(async () => {
    await api.login('user', 'password');
    const list = await api.getMealList();
    const meal = await api.getMealDetail(list[0].id);
    console.log(meal);
})();
```
