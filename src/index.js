class EditorApp extends HTMLElement {
  constructor() {
    super();
    this.templates = ["template 1", "template 2", "template 3"];
    this.selectedTemplateIndex = 2;

    this.innerHTML = `
        <style>
          /* Общий стиль контейнера редактора */
          .editor-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            border-right: 2px solid #4A90E2; /* более толстая граница с акцентом */
            background-color: #1e1e2f; /* темный фон */
            color: #e0e0e0; /* светлый цвет текста */
          }
          /* Кнопка вставки */
          .insert-button {
            background-color: #6FCF97; /* мягкий зеленый */
            color: #fff;
            border: none;
            padding: 12px 20px;
            margin: 12px;
            cursor: pointer;
            font-weight: 600;
            border-radius: 8px;
            transition: background-color 0.3s;
          }
          .insert-button:hover {
            background-color: #55b67f;
          }
          /* Область редактора */
          .editor-area {
            flex: 1;
            padding: 15px;
            background-color: #2c2c3c; /* чуть светлее, чтобы выделить область */
            border-radius: 8px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
            overflow-y: auto;
          }
          /* Панель шаблонов */
          .templates-panel {
            width: 280px;
            padding: 15px;
            background-color: #3b3b4a; /* немного светлее фона */
            color: #f0f0f0;
            display: flex;
            flex-direction: column;
          }
          /* Заголовок шаблонов */
          .templates-header {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            border-bottom: 2px solid #4A90E2;
            padding-bottom: 6px;
          }
          /* Список шаблонов */
          .template-list {
            background-color: #44465A;
            margin-bottom: 20px;
            border-radius: 6px;
            overflow: hidden;
          }
          /* Элемент шаблона */
          .template-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .template-item:hover {
            background-color: #5C5C6E;
          }
          /* Выделенный шаблон */
          .template-item.selected {
            background-color: #4A90E2;
            color: #fff;
          }
          /* Панель кнопок добавления/удаления */
          .template-buttons {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
          }
          /* Стиль кнопок +конфигурация */
          .template-button {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
            cursor: pointer;
            font-size: 20px;
            font-weight: 700;
            border: none;
            border-radius: 50%;
            transition: background-color 0.2s, transform 0.2s;
          }
          .add-template {
            background-color: #4CAF50; /* яркий зеленый */
            color: #fff;
          }
          .add-template:hover {
            background-color: #45a049;
            transform: scale(1.05);
          }
          .remove-template {
            background-color: #E53935; /* насыщенный красный */
            color: #fff;
          }
          .remove-template:hover {
            background-color: #c62828;
            transform: scale(1.05);
          }
          /* Раздел редактирования шаблона */
          .edit-template-section {
            margin-top: 20px;
          }
          .edit-template-label {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          /* Ввод для редактирования */
          .edit-template-input {
  width: 100%; /* чтобы занимало всю доступную ширину контейнера */
  max-width: 250px; /* ограничьте максимальную ширину */
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #4A90E2;
  background-color: #2c2c3c;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box; /* чтобы padding не увеличивал ширину */
          }
          /* Стиль компонента шаблона внутри редактора */
          .template-component {
            display: inline-block;
            border: 1px dashed #FFCC00;
            border-radius: 4px;
            background-color: #FFD70066; /* прозрачный желтый */
            padding: 3px 8px;
            margin: 2px;
            cursor: pointer;
            min-width: 130px;
            font-weight: 600;
          }
          /* Стиль ошибок */
          .template-error {
            display: inline-block;
            color: #e53935;
            font-weight: bold;
            padding: 3px 6px;
            margin: 2px;
            border: 1px solid #e53935;
            border-radius: 4px;
            background-color: #ffebee;
            font-size: 13px;
          }
          /* TinyMCE стили */
          .tox .template-component {
            display: inline-block;
            border: 1px dashed #FFCC00;
            border-radius: 4px;
            background-color: #ffd70066;
            padding: 3px 8px;
            margin: 2px;
            cursor: pointer;
            min-width: 130px;
            font-weight: 600;
          }
          /* Контекстное меню компонента внутри редактора */
          .template-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 2000;
            background-color: #4A90E2;
            border: 1px solid #3680c2;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            min-width: 140px;
            display: none;
          }
          /* Видимость dropdown */
          .template-dropdown.visible {
            display: block;
          }
          /* Элементы dropdown */
          .template-dropdown-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .template-dropdown-item:hover {
            background-color: #5C5C6E;
          }
          /* Общие стили для TinyMCE */
          .tox-tinymce {
            border: none !important;
            border-radius: 4px;
          }
          .tox:not(.tox-tinymce-inline) .tox-editor-header {
            display: none !important;
          }
        </style>
  
        <div class="editor-container">
          <button class="insert-button" id="insert-button">Вставить</button>
          <div class="editor-area">
            <div id="editor-content"></div>
          </div>
        </div>
        <div class="templates-panel">
          <div class="templates-header">Шаблоны</div>
          <div class="template-list" id="template-list"></div>
          <div class="template-buttons">
            <div class="template-button remove-template" id="remove-template" title="Удалить шаблон">−</div>
            <div class="template-button add-template" id="add-template" title="Добавить шаблон">+</div>
          </div>
          <div class="edit-template-section">
            <div class="edit-template-label">Редактировать шаблон</div>
            <input type="text" class="edit-template-input" id="edit-template-input" placeholder="Введите название шаблона">
          </div>
        </div>
      `;

    this.templateList = this.querySelector("#template-list");
    this.removeTemplateButton = this.querySelector("#remove-template");
    this.addTemplateButton = this.querySelector("#add-template");
    this.editTemplateInput = this.querySelector("#edit-template-input");
    this.insertButton = this.querySelector("#insert-button");

    this.renderTemplateList();
    this.initEventListeners();

    window.addEventListener("load", () => {
      this.initTinyMCE();
    });
  }

  renderTemplateList() {
    this.templateList.innerHTML = "";
    this.templates.forEach((template, index) => {
      const templateItem = document.createElement("div");
      templateItem.className = "template-item";
      if (index === this.selectedTemplateIndex) {
        templateItem.classList.add("selected");
        this.editTemplateInput.value = template;
      }
      templateItem.textContent = template;
      templateItem.dataset.index = index;
      this.templateList.appendChild(templateItem);
    });
  }

  initEventListeners() {
    // Выбор шаблона
    this.templateList.addEventListener("click", (event) => {
      if (event.target.classList.contains("template-item")) {
        const index = parseInt(event.target.dataset.index);
        this.selectedTemplateIndex = index;
        this.editTemplateInput.value = this.templates[index];
        this.renderTemplateList();
      }
    });

    // Добавление шаблона
    this.addTemplateButton.addEventListener("click", () => {
      this.templates.push("новый шаблон");
      this.selectedTemplateIndex = this.templates.length - 1;
      this.editTemplateInput.value = "новый шаблон";
      this.renderTemplateList();
      this.editTemplateInput.focus();
    });

    // Удаление выбранного шаблона
    this.removeTemplateButton.addEventListener("click", () => {
      if (this.templates.length > 0 && this.selectedTemplateIndex !== -1) {
        const removedTemplate = this.templates[this.selectedTemplateIndex];
        this.templates.splice(this.selectedTemplateIndex, 1);
        if (this.templates.length === 0) {
          this.selectedTemplateIndex = -1;
          this.editTemplateInput.value = "";
        } else {
          this.selectedTemplateIndex = Math.min(
            this.selectedTemplateIndex,
            this.templates.length - 1
          );
          this.editTemplateInput.value =
            this.templates[this.selectedTemplateIndex];
        }
        this.renderTemplateList();
        this.updateDropdownComponents(removedTemplate);
      }
    });

    // Обновление шаблона при потере фокуса или по нажатию Enter
    this.editTemplateInput.addEventListener("blur", () => {
      this.updateSelectedTemplate();
    });
    this.editTemplateInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.updateSelectedTemplate();
      }
    });

    // Вставка специального компонента
    this.insertButton.addEventListener("click", () => {
      this.insertSpecialComponent();
    });
  }

  updateSelectedTemplate() {
    if (this.selectedTemplateIndex !== -1) {
      const oldValue = this.templates[this.selectedTemplateIndex];
      const newValue = this.editTemplateInput.value.trim();

      if (newValue !== "" && newValue !== oldValue) {
        this.templates[this.selectedTemplateIndex] = newValue;
        this.renderTemplateList();
        this.updateTemplateReferences(oldValue, newValue);
      }
    }
  }

  initTinyMCE() {
    if (typeof tinymce === "undefined") {
      console.error("TinyMCE не загружен");
      return;
    }

    // Регистрация плагина для шаблонных компонентов
    tinymce.PluginManager.add("templatecomponent", (editor) => {
      // Команда вставки компонента
      editor.addCommand("insertTemplateComponent", () => {
        this.insertSpecialComponent();
      });

      // Автодополнение при вводе '@'
      editor.ui.registry.addAutocompleter("templateList", {
        ch: "@",
        minChars: 0,
        columns: 1,
        fetch: (pattern) => {
          return new Promise((resolve) => {
            const matchedItems = this.templates.map((template) => ({
              value: template,
              text: template,
            }));
            resolve(matchedItems);
          });
        },
        onAction: (autocompleteApi, rng, value) => {
          editor.selection.setRng(rng);
          const uniqueId = "template-" + Date.now();
          const templateComponentHTML = `<span id="${uniqueId}" class="template-component" contenteditable="false" data-template="${value}">${value}</span>&nbsp;`;
          editor.insertContent(templateComponentHTML);
          autocompleteApi.hide();
        },
      });

      // Регистрация формата для шаблонных компонентов
      editor.on("init", () => {
        editor.formatter.register("templatecomponent", {
          inline: "span",
          classes: "template-component",
          attributes: { "data-template": "%value" },
        });
      });

      // Контекстное меню для шаблонных компонентов
      editor.ui.registry.addContextMenu("templatecontextmenu", {
        update: (element) => {
          if (element.classList.contains("template-component")) {
            return "edittemplate removetemplate";
          }
          return "";
        },
      });

      // Пункты меню
      editor.ui.registry.addMenuItem("edittemplate", {
        text: "Редактировать шаблон",
        icon: "edit-block",
        onAction: () => {
          const selected = editor.selection.getNode();
          if (selected && selected.classList.contains("template-component")) {
            this.showTemplateEditor(selected);
          }
        },
      });
      editor.ui.registry.addMenuItem("removetemplate", {
        text: "Удалить шаблон",
        icon: "remove",
        onAction: () => {
          const selected = editor.selection.getNode();
          if (selected && selected.classList.contains("template-component")) {
            editor.dom.remove(selected);
          }
        },
      });
    });

    // Инициализация TinyMCE
    tinymce.init({
      selector: "#editor-content",
      height: 400,
      menubar: false,
      statusbar: false,
      plugins: ["templatecomponent"],
      toolbar: "",
      contextmenu: "templatecontextmenu link table",
      content_css: false,
      content_style: `
          body { 
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; 
            padding: 10px; 
            background-color: #1e1e2f;
            color: #e0e0e0;
          }
          .mce-content-body {
            background-color: #2c2c3c !important;
          }
          .tox-tinymce {
            border: none !important;
            border-radius: 4px;
          }
          .tox:not(.tox-tinymce-inline) .tox-editor-header {
            display: none !important;
          }
          /* Стиль шаблонных компонентов */
          .template-component {
            display: inline-block;
            border: 1px dashed #FFCC00;
            border-radius: 4px;
            background-color: #FFD70066;
            padding: 3px 8px;
            margin: 2px;
            cursor: pointer;
            min-width: 130px;
            font-weight: 600;
            transition: background-color 0.2s, transform 0.2s;
          }
          .template-component:hover {
            background-color: #ffe066;
            transform: scale(1.02);
          }
          /* Ошибки */
          .template-error {
            display: inline-block;
            color: #e53935;
            font-weight: bold;
            padding: 3px 6px;
            margin: 2px;
            border: 1px solid #e53935;
            border-radius: 4px;
            background-color: #ffebee;
          }
          /* Dropdown для шаблонов внутри редактора */
          .template-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 2000;
            background-color: #4A90E2;
            border: 1px solid #3680c2;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            min-width: 140px;
            display: none;
          }
          .template-dropdown.visible {
            display: block;
          }
          .template-dropdown-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .template-dropdown-item:hover {
            background-color: #5C5C6E;
          }
        `,
      setup: (editor) => {
        this.editor = editor;
        editor.on("click", (e) => {
          const target = e.target;
          if (target.classList.contains("template-component")) {
            this.showTemplateSelector(target);
            e.stopPropagation();
          } else {
            this.closeAllDropdowns();
          }
        });
        editor.on("init", () => {
          editor.setContent("<p>Здесь пользователь вводит текст</p>");

          editor.getWin().addEventListener("click", (e) => {
            if (
              !e.target.closest(".template-component") &&
              !e.target.closest(".template-dropdown")
            ) {
              this.closeAllDropdowns();
            }
          });
        });
      },
    });
  }

  closeAllDropdowns() {
    if (!this.editor) return;
    const dropdowns = this.editor.dom.select(".template-dropdown.visible");
    dropdowns.forEach((dd) => dd.classList.remove("visible"));
  }

  showTemplateSelector(target) {
    if (!this.editor) return;
    this.closeAllDropdowns();
    let dropdown = target.querySelector(".template-dropdown");
    if (!dropdown) {
      dropdown = this.editor.dom.create("div", {
        class: "template-dropdown",
      });
      this.templates.forEach((template) => {
        const item = this.editor.dom.create(
          "div",
          {
            class: "template-dropdown-item",
            "data-value": template,
          },
          template
        );
        this.editor.dom.bind(item, "click", (e) => {
          target.setAttribute("data-template", template);
          target.textContent = template;
          dropdown.classList.remove("visible");
          e.stopPropagation();
        });
        dropdown.appendChild(item);
      });
      target.appendChild(dropdown);
    }
    dropdown.classList.add("visible");
  }

  showTemplateEditor(component) {
    const currentTemplate = component.getAttribute("data-template");
    const index = this.templates.indexOf(currentTemplate);
    if (index !== -1) {
      this.selectedTemplateIndex = index;
      this.editTemplateInput.value = currentTemplate;
      this.renderTemplateList();
      this.editTemplateInput.scrollIntoView({ behavior: "smooth" });
      this.editTemplateInput.focus();
    }
  }

  insertSpecialComponent() {
    if (!this.editor || this.templates.length === 0) return;
    const template =
      this.templates[this.selectedTemplateIndex] || this.templates[0];
    const uniqueId = "template-" + Date.now();
    const html = `<span id="${uniqueId}" class="template-component" contenteditable="false" data-template="${template}">${template}</span>&nbsp;`;
    this.editor.insertContent(html);
  }

  updateDropdownComponents(removedTemplate) {
    if (!this.editor) return;
    const components = this.editor.dom.select(
      `.template-component[data-template="${removedTemplate}"]`
    );
    components.forEach((comp) => {
      const errorSpan = this.editor.dom.create(
        "span",
        { class: "template-error" },
        "Ошибка"
      );
      this.editor.dom.replace(errorSpan, comp);
    });
  }

  updateTemplateReferences(oldVal, newVal) {
    if (!this.editor) return;
    const components = this.editor.dom.select(
      `.template-component[data-template="${oldVal}"]`
    );
    components.forEach((comp) => {
      comp.setAttribute("data-template", newVal);
      comp.textContent = newVal;
    });
  }
}

customElements.define("editor-app", EditorApp);
