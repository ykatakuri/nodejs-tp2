import './common/orm.config.js';
import 'src/app.js';

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server is running listening port ${port}`));
