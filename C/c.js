// Статус: полное решение

/**
 * @param dependencies объект с исходными зависимостями, в него же должен быть записан и ответ
 * @param fetcher функция для получения информации о зависимостях пакета.
 * @returns {Promise<void>}
 */

async function buildDependencyTree(dependencies, fetcher) {
  async function getResponse(dep) {
    while (true) {
      try {
        const info = await fetcher(dep);
        return info;
      } catch {}
    }
  }
  async function f(d) {
    for (const dep of Object.keys(d)) {
      const info = await getResponse(dep);

      const res = {};

      for (const iterator of info.dependencies) {
        res[iterator] = {};
      }

      d[dep] = res;

      await f(res);
    }
  }

  await f(dependencies);
}

module.exports = buildDependencyTree;
