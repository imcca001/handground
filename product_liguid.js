<!-- /templates/product.liquid -->
<div itemscope itemtype="http://schema.org/Product" id="ProductSection--{{ section.id }}" data-section-id="{{ section.id }}" data-section-type="product-template" data-image-zoom-type="{{ section.settings.zoom_enable }}" data-enable-history-state="true" data-scroll-to-image="{% if section.settings.image_layout == "stacked" %}true{% else %}false{% endif %}">

    <meta itemprop="url" content="{{ shop.url }}{{ product.url }}">
    <meta itemprop="image" content="{{ product.featured_image.src | img_url: 'grande' }}">

    {% assign current_variant = product.selected_or_first_available_variant %}
    {% assign featured_image = current_variant.featured_image | default: product.featured_image %}

    <div class="grid product-single">
      <div class="grid__item large--seven-twelfths medium--seven-twelfths text-center">

        {% if section.settings.image_layout == "stacked" %}
          {% comment %}
            Default or stacked layout
          {% endcomment %}

          {% comment %}
            We need to figure out the max width we want the image to be on the page
            based on the aspect ratio of the image and based on the size of the
            image.
          {% endcomment %}
          <div class="product-single__photos">
            {% capture img_id_class %}product-single__photo-{{ featured_image.id }}{% endcapture %}
            {% capture wrapper_id %}ProductImageWrapper-{{ featured_image.id }}{% endcapture %}

            {% comment %}
              Display current variant image
            {% endcomment %}
            <div class="product-single__photo--flex-wrapper">
              <div class="product-single__photo--flex">
                {% include 'image-style' with image: featured_image, width: 575, height: 850, small_style: true, wrapper_id: wrapper_id, img_id_class: img_id_class %}
                <div id="{{ wrapper_id }}" class="product-single__photo--container">
                  <div class="product-single__photo-wrapper" style="padding-top:{{ 1 | divided_by: featured_image.aspect_ratio | times: 100}}%;">
                    {% assign img_url = featured_image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' %}
                    <img class="product-single__photo lazyload {{ img_id_class }}"
                      src="{{ featured_image | img_url: '300x300' }}"
                      data-src="{{ img_url }}"
                      data-widths="[180, 360, 590, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                      data-aspectratio="{{ featured_image.aspect_ratio }}"
                      data-sizes="auto"
                      {% if section.settings.zoom_enable %}data-mfp-src="{{ featured_image | img_url: '1024x1024' }}"{% endif %}
                      data-image-id="{{ featured_image.id }}"
                      alt="{{ featured_image.alt | escape }}">

                    <noscript>
                      <img class="product-single__photo"
                        src="{{ featured_image | img_url: 'master' }}"
                        {% if section.settings.zoom_enable %}data-mfp-src="{{ featured_image | img_url: '1024x1024' }}"{% endif %}
                        alt="{{ featured_image.alt | escape }}" data-image-id="{{ featured_image.id }}">
                    </noscript>
                  </div>
                </div>
              </div>
            </div>

            {% comment %}
              Display rest of product images, not repeating the featured one
            {% endcomment %}
            {% for image in product.images %}
              {% unless image contains featured_image %}

                {% comment %}
                  We need to figure out the max width we want the image to be on the page
                  based on the aspect ratio of the image and based on the size of the
                  image.
                {% endcomment %}
                {% capture img_id_class %}product-single__photo-{{ image.id }}{% endcapture %}
                {% capture wrapper_id %}ProductImageWrapper-{{ image.id }}{% endcapture %}

                <div class="product-single__photo--flex-wrapper">
                  <div class="product-single__photo--flex">
                    {% include 'image-style' with image: image, width: 575, height: 850, small_style: true, wrapper_id: wrapper_id, img_id_class: img_id_class %}
                    <div id="{{ wrapper_id }}" class="product-single__photo--container">
                      <div class="product-single__photo-wrapper" style="padding-top:{{ 1 | divided_by: image.aspect_ratio | times: 100}}%;">
                        {% assign img_url = image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' %}
                        <img class="product-single__photo lazyload {{ img_id_class }}"
                          src="{{ image | img_url: '300x' }}"
                          data-src="{{ img_url }}"
                          data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                          data-aspectratio="{{ image.aspect_ratio }}"
                          data-sizes="auto"
                          {% if section.settings.zoom_enable %}data-mfp-src="{{ image.src | img_url: '1024x1024' }}"{% endif %}
                          data-image-id="{{ image.id }}"
                          alt="{{ image.alt | escape }}">

                        <noscript>
                          <img class="product-single__photo" src="{{ image.src | img_url: 'master' }}"
                            {% if section.settings.zoom_enable %}data-mfp-src="{{ image.src | img_url: '1024x1024' }}"{% endif %}
                            alt="{{ image.alt | escape }}"
                            data-image-id="{{ image.id }}">
                        </noscript>
                      </div>
                    </div>
                  </div>
                </div>
              {% endunless %}
            {% endfor %}

          </div>

        {% else %}
          {% comment %}
            Thumbnails layout
          {% endcomment %}

          <div class="product-thumbnail__photos product-single__photos">

            {% comment %}
              We need to figure out the max width we want the image to be on the page
              based on the aspect ratio of the image and based on the size of the
              image.
            {% endcomment %}
            {% capture img_id_class %}product-single__photo-{{ featured_image.id }}{% endcapture %}
            {% capture wrapper_id %}ProductImageWrapper-{{ featured_image.id }}{% endcapture %}

            {% comment %}
              Display current variant image
            {% endcomment %}
            <div class="product-single__photo--flex-wrapper">
              <div class="product-single__photo--flex">
                {% include 'image-style' with image: featured_image, width: 575, height: 850, small_style: true, wrapper_id: wrapper_id, img_id_class: img_id_class %}
                <div id="{{ wrapper_id }}" class="product-single__photo--container product-single__photo--container-thumb">
                  <div class="product-single__photo-wrapper" style="padding-top:{{ 1 | divided_by: featured_image.aspect_ratio | times: 100}}%;">
                    {% assign img_url = featured_image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' %}
                    <img class="product-single__photo lazyload {{ img_id_class }}"
                      src="{{ featured_image | img_url: '300x300' }}"
                      data-src="{{ img_url }}"
                      data-widths="[180, 360, 590, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                      data-aspectratio="{{ featured_image.aspect_ratio }}"
                      data-sizes="auto"
                      {% if section.settings.zoom_enable %}data-mfp-src="{{ featured_image | img_url: '1024x1024' }}"{% endif %}
                      data-image-id="{{ featured_image.id }}"
                      alt="{{ featured_image.alt | escape }}">

                    <noscript>
                      <img class="product-single__photo"
                        src="{{ featured_image | img_url: 'master' }}"
                        {% if section.settings.zoom_enable %}data-mfp-src="{{ featured_image | img_url: '1024x1024' }}"{% endif %}
                        alt="{{ featured_image.alt | escape }}" data-image-id="{{ featured_image.id }}">
                    </noscript>
                  </div>
                </div>
              </div>
            </div>

            {% comment %}
              Populate rest of product images with display = none, not repeating the featured one
            {% endcomment %}
            {% for image in product.images %}
              {% unless image contains featured_image %}

                {% comment %}
                  We need to figure out the max width we want the image to be on the page
                  based on the aspect ratio of the image and based on the size of the
                  image.
                {% endcomment %}
                {% capture img_id_class %}product-single__photo-{{ image.id }}{% endcapture %}
                {% capture wrapper_id %}ProductImageWrapper-{{ image.id }}{% endcapture %}

                <div class="product-single__photo--flex-wrapper">
                  <div class="product-single__photo--flex">
                    {% include 'image-style' with image: image, width: 575, height: 850, small_style: true, wrapper_id: wrapper_id, img_id_class: img_id_class %}
                    <div id="{{ wrapper_id }}" class="product-single__photo--container product-single__photo--container-thumb hide">
                      <div class="product-single__photo-wrapper" style="padding-top:{{ 1 | divided_by: image.aspect_ratio | times: 100}}%;">
                        {% assign img_url = image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' %}
                        <img class="product-single__photo lazyload {{ img_id_class }}"
                          src="{{ image | img_url: '300x' }}"
                          data-src="{{ img_url }}"
                          data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                          data-aspectratio="{{ image.aspect_ratio }}"
                          data-sizes="auto"
                          {% if section.settings.zoom_enable %}data-mfp-src="{{ image.src | img_url: '1024x1024' }}"{% endif %}
                          data-image-id="{{ image.id }}"
                          alt="{{ image.alt | escape }}">

                        <noscript>
                          <img class="product-single__photo" src="{{ image.src | img_url: 'master' }}"
                            {% if section.settings.zoom_enable %}data-mfp-src="{{ image.src | img_url: '1024x1024' }}"{% endif %}
                            alt="{{ image.alt | escape }}"
                            data-image-id="{{ image.id }}">
                        </noscript>
                      </div>
                    </div>
                  </div>
                </div>
              {% endunless %}
            {% endfor %}

            {% comment %}
              Display thumbnails
            {% endcomment %}
            <ul class="product-single__thumbnails small--hide grid-uniform" id="ProductThumbs">
              {% for image in product.images %}
                {% if product.images.size > 1 %}
                  <li class="grid__item medium--one-third large--one-quarter product-single__photo-wrapper">
                    <a data-image-id="{{ image.id }}" href="{{ image.src | img_url: 'grande' }}" class="product-single__thumbnail {% if image contains featured_image %} active-thumb{% endif %}">
                      <img class="product-single__thumb" src="{{ image.src | img_url: '150x' }}" alt="{{ image.alt | escape }}">
                    </a>
                  </li>
                {% endif %}
              {% endfor %}
            </ul>

          </div>
        {% endif %}
      </div>

      <div class="grid__item product-single__meta--wrapper medium--five-twelfths large--five-twelfths">
        <div class="product-single__meta">
          {% if section.settings.product_vendor_enable %}
            <h2 class="product-single__vendor" itemprop="brand">{{ product.vendor }}</h2>
          {% endif %}

          <h1 class="product-single__title" itemprop="name">{{ product.title }}</h1>
          <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            
            <div data-price-container>
              {% comment %}
                Optionally show the 'compare at' or original price of the product.
              {% endcomment %}

              {% if current_variant.compare_at_price > current_variant.price %}
                <span id="PriceA11y" class="visually-hidden" {% unless current_variant.available %}aria-hidden="true"{% endunless %}>{{ 'products.general.regular_price' | t }}</span>
                <span class="product-single__price--wrapper" aria-hidden="false">
                  <span id="ComparePrice" class="product-single__price--compare-at">
                    {{ current_variant.compare_at_price | money }}
                  </span>
                </span>
                <span id="ComparePriceA11y" class="visually-hidden" aria-hidden="false">{{ 'products.general.sale_price' | t }}</span>
              {% else %}
                <span id="PriceA11y" class="visually-hidden" {% unless current_variant.available %}aria-hidden="true"{% endunless %}>{{ 'products.general.regular_price' | t }}</span>
                <span class="product-single__price--wrapper hide" aria-hidden="true">
                  <span id="ComparePrice" class="product-single__price--compare-at"></span>
                </span>
                <span id="ComparePriceA11y" class="visually-hidden" aria-hidden="true">{{ 'products.general.sale_price' | t }}</span>
              {% endif %}

              <span id="ProductPrice"
                class="product-single__price{% if current_variant.compare_at_price > current_variant.price %} on-sale{% endif %}"
                itemprop="price"
                content="{{ current_variant.price | divided_by: 100.00 }}"
                {% unless current_variant.available %}aria-hidden="true"{% endunless %}>
                {{ current_variant.price | money }}
              </span>
            </div>

            <hr class="hr--small">

            <meta itemprop="priceCurrency" content="{{ shop.currency }}">
            <link itemprop="availability" href="http://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}">

            {% capture "form_classes" %}
              product-single__form{% if product.has_only_default_variant %} product-single__form--no-variants{% endif %}
            {%- endcapture %}

            {% capture "form_id" %}AddToCartForm--{{ section.id }}{%- endcapture %}

            {% form 'product', product, class:form_classes, id:form_id %}
              {% unless product.has_only_default_variant %}
                {% for option in product.options_with_values %}
                  <div class="radio-wrapper js product-form__item">
                    <label class="single-option-radio__label{% if option.name == 'Default' or option.name == 'Title' %} hidden-label{% endif %}"
                      for="ProductSelect-option-{{ forloop.index0 }}">
                      {{ option.name | escape }}
                    </label>
                    {% if section.settings.product_selector == 'radio' %}
                      <fieldset class="single-option-radio"
                        name="{{ option.name | handleize }}"
                        id="ProductSelect-option-{{ forloop.index0 }}">
                        {% assign option_index = forloop.index %}
                        {% for value in option.values %}
                          {% assign variant_label_state = true %}
                          {% if product.options.size == 1 %}
                            {% unless product.variants[forloop.index0].available  %}
                              {% assign variant_label_state = false %}
                            {% endunless %}
                          {% endif %}
                          <input type="radio"
                            {% if option.selected_value == value %} checked="checked"{% endif %}
                            {% unless variant_label_state %} disabled="disabled"{% endunless %}
                            value="{{ value | escape }}"
                            data-index="option{{ option_index }}"
                            name="{{ option.name | handleize }}"
                            class="single-option-selector__radio{% unless variant_label_state %} disabled{% endunless %}"
                            id="ProductSelect-option-{{ option.name | handleize }}-{{ value | escape }}">
                          <label for="ProductSelect-option-{{ option.name | handleize }}-{{ value | escape }}"{% unless variant_label_state %} class="disabled"{% endunless %}>{{ value | escape }}</label>
                        {% endfor %}
                      </fieldset>
                    {% else %}
                      <select class="single-option-selector__radio single-option-selector-{{ section.id }} product-form__input" id="SingleOptionSelector-{{ forloop.index0 }}" data-index="option{{ forloop.index }}">
                        {% for value in option.values %}
                          <option value="{{ value | escape }}"{% if option.selected_value == value %} selected="selected"{% endif %}>{{ value | escape }}</option>
                        {% endfor %}
                      </select>
                    {% endif %}
                  </div>
                {% endfor %}
              {% endunless %}

              <select name="id" id="ProductSelect" class="product-single__variants no-js">
                {% for variant in product.variants %}
                  {% if variant.available %}
                    <option {% if variant == product.selected_or_first_available_variant %}
                      selected="selected" {% endif %}
                      data-sku="{{ variant.sku }}"
                      value="{{ variant.id }}">
                      {{ variant.title }} - {{ variant.price | money_with_currency }}
                    </option>
                  {% else %}
                    <option disabled="disabled">
                      {{ variant.title }} - {{ 'products.product.sold_out' | t }}
                    </option>
                  {% endif %}
                {% endfor %}
              </select>

              {% if section.settings.quantity_enabled %}
              <div class="product-single__quantity">
                <label for="Quantity" class="product-single__quantity-label js-quantity-selector">{{ 'products.product.quantity' | t }}</label>
                <input type="number" hidden="hidden" id="Quantity" name="quantity" value="1" min="1" class="js-quantity-selector">
              </div>
              {% endif %}
            <div class="yotpo bottomLine"
  				data-product-id="{{ product.id }}">
					</div>

              <div class="product-single__add-to-cart{% if section.settings.add_to_cart_button_size == 'large' %} product-single__add-to-cart--full-width{% endif %}">
                <button type="submit" name="add" id="AddToCart--{{ section.id }}" class="btn btn--add-to-cart{% if section.settings.enable_payment_button %} btn--secondary-accent{% endif %}"{% unless current_variant.available %} disabled="disabled"{% endunless %}>
                  <span class="btn__text">
                    {% if current_variant.available %}
                      {{ 'products.product.add_to_cart' | t }}
                    {% else %}
                      {{ 'products.product.sold_out' | t }}
                    {% endif %}
                  </span>
                </button>
                {% if section.settings.enable_payment_button %}
                  {{ form | payment_button }}
                {% endif %}
              </div>
            {% endform %}
            <div class="product-single__description rte" itemprop="description">
            {{ product.description }}
          </div>
                   
    </div>

          </div>

          {% if section.settings.social_sharing_products %}
            {% include 'social-sharing', share_title: product.title, share_permalink: product.url, share_image: product %}
          {% endif %}
        </div>
      </div>
    </div>

    <div id="cbb-also-bought-box"></div>
    {% if collection %}
      <hr class="hr--clear">
      <div class="text-center">
        <a href="{{ collection.url }}" class="return-link">&larr; {{ 'products.general.collection_return' | t: collection: collection.title }}</a>
      </div>
    {% endif %}

</div>
{% unless product.empty == empty %}
  <script type="application/json" id="ProductJson-{{ section.id }}">
    {{ product | json }}
  </script>
{% endunless %}

{% schema %}
  {
    "name": {
      "pt-BR": "Páginas de produtos",
      "es": "Páginas de productos",
      "de": "Produktseiten",
      "it": "Pagine di prodotto",
      "en": "Product pages",
      "ja": "商品ページ",
      "fr": "Pages de produits"
    },
    "settings": [
      {
        "type": "checkbox",
        "id": "zoom_enable",
        "label": {
          "pt-BR": "Ative o zoom da imagem",
          "es": "Habilitar zoom de imagen",
          "de": "Aktivieren des Bildzooms",
          "it": "Abilita lo zoom dell'immagine",
          "en": "Enable image zoom",
          "ja": "画像ズームを有効にする",
          "fr": "Activer le zoom sur image"
        }
      },
      {
        "type": "checkbox",
        "id": "social_sharing_products",
        "label": {
          "pt-BR": "Habilite o compartilhamento de produtos",
          "es": "Habilitar compartir productos",
          "de": "Teilen von Produkten aktivieren",
          "it": "Permetti condivisione del prodotto",
          "en": "Enable product sharing",
          "ja": "商品の共有を有効にする",
          "fr": "Activer le partage de produits"
        },
        "default": true
      },
      {
        "type": "checkbox",
        "id": "product_vendor_enable",
        "label": {
          "pt-BR": "Exiba o fornecedor do produto",
          "es": "Mostrar proveedor del producto",
          "de": "Produktverkäufer anzeigen",
          "it": "Indica fornitore prodotto",
          "en": "Show product vendor",
          "ja": "商品の販売元を表示する",
          "fr": "Afficher le distributeur du produit"
        }
      },
      {
        "type": "select",
        "id": "image_layout",
        "label": {
          "pt-BR": "Exibição de imagem",
          "es": "Visualización de imagen",
          "de": "Bildanzeige",
          "it": "Visualizzazione immagine",
          "en": "Image display",
          "ja": "画像表示",
          "fr": "Affichage de l'image"
        },
        "default": "stacked",
        "options": [
          {
            "value": "stacked",
            "label": {
              "pt-BR": "Empilhado",
              "es": "Stacked",
              "de": "Gestapelt",
              "it": "Elenco",
              "en": "Stacked",
              "ja": "スタックされました",
              "fr": "Empiler"
            }
          },
          {
            "value": "thumbnails",
            "label": {
              "pt-BR": "Miniaturas",
              "es": "Miniaturas",
              "de": "Vorschaubilder",
              "it": "Miniature",
              "en": "Thumbnails",
              "ja": "サムネイル",
              "fr": "Vignettes"
            }
          }
        ]
      },
      {
        "type": "header",
        "content": {
          "pt-BR": "Formulário de opções de produtos",
          "es": "Formulario de opciones de producto",
          "de": "Produktoptionsformular",
          "it": "Modulo delle opzioni di prodotto",
          "en": "Product options form",
          "ja": "商品オプションのフォーム",
          "fr": "Formulaire d'options de produit"
        }
      },
      {
        "type": "checkbox",
        "id": "quantity_enabled",
        "label": {
          "pt-BR": "Exibir seletor de quantidade",
          "es": "Mostrar selector de cantidad",
          "de": "Mengenauswahl anzeigen",
          "it": "Mostra selettore di quantità",
          "en": "Show quantity picker",
          "ja": "数量ピッカーを表示する",
          "fr": "Afficher le sélecteur de quantité"
        }
      },
      {
        "type": "select",
        "id": "product_selector",
        "label": {
          "pt-BR": "Tipo de seletor",
          "es": "Tipo de selector",
          "de": "Auswahlart",
          "it": "Tipo di selettore",
          "en": "Picker type",
          "ja": "ピッカーの種類",
          "fr": "Type de sélecteur"
        },
        "options": [
          {
            "value": "radio",
            "label": {
              "pt-BR": "Botão",
              "es": "Botón",
              "de": "Schaltfläche",
              "it": "Pulsante",
              "en": "Button",
              "ja": "ボタン",
              "fr": "Bouton"
            }
          },
          {
            "value": "select",
            "label": {
              "pt-BR": "Menu suspenso",
              "es": "Desplegable",
              "de": "Dropdown",
              "it": "Menu a tendina",
              "en": "Dropdown",
              "ja": "ドロップダウン",
              "fr": "Menu déroulant"
            }
          }
        ]
      },
      {
        "type": "header",
        "content": {
          "pt-BR": "Botão Adicionar ao carrinho",
          "es": "Añadir al carrito",
          "de": "Schaltfläche In den Warenkorb",
          "it": "Pulsante \"Aggiungi al carrello\"",
          "en": "Add to cart button",
          "ja": "カートボタンに追加する",
          "fr": "Bouton d'ajout au panier"
        }
      },
      {
        "type": "checkbox",
        "id": "enable_payment_button",
        "label": {
          "pt-BR": "Exibir botão dinâmico de finalização da compra",
          "es": "Mostrar botón de pago dinámico",
          "de": "Dynamischen Checkout-Button anzeigen",
          "it": "Mostra pulsante di check-out dinamico",
          "en": "Show dynamic checkout button",
          "ja": "動的チェックアウトボタンを表示する",
          "fr": "Afficher le bouton de passage à la caisse dynamique"
        },
        "info": {
          "pt-BR": "Permite que os clientes finalizem os pedidos na hora usando um método de pagamento salvo. [Saiba mais](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)",
          "es": "Permite a los clientes pagar directamente usando un método de pago familiar. [Más información](https://help.shopify.com/manual/using-themes/themes-by-shopify/brooklyn#navigation-tips-tips-specific)",
          "de": "Geben Sie Kunden die Möglichkeit, direkt mit einer vertrauten Zahlungsmethode auszuchecken. [Mehr Infos](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)",
          "it": "Fai in modo che i clienti effettuino il check-out direttamente utilizzando un metodo di pagamento a loro conosciuto. [Maggiori informazioni](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)",
          "en": "Lets customers check out directly using a familiar payment method. [Learn more](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)",
          "ja": "使い慣れた決済方法を使用して、お客様に直接チェックアウトしてもらいましょう。[もっと詳しく](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)",
          "fr": "Permet aux clients de passer directement à la caisse en utilisant un moyen de paiement familier. [En savoir plus](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)"
        },
        "default": false
      },
      {
        "type": "select",
        "id": "add_to_cart_button_size",
        "label": {
          "pt-BR": "Tamanho do botão",
          "es": "Tamaño del botón",
          "de": "Schaltflächengröße",
          "it": "Dimensione pulsante",
          "en": "Button size",
          "ja": "ボタンのサイズ",
          "fr": "Taille du bouton"
        },
        "default": "small",
        "options": [
          {
            "value": "small",
            "label": {
              "pt-BR": "Pequeno",
              "es": "Pequeña",
              "de": "Klein",
              "it": "Piccolo",
              "en": "Small",
              "ja": "小",
              "fr": "Petit"
            }
          },
          {
            "value": "large",
            "label": {
              "pt-BR": "Grande",
              "es": "grande",
              "de": "Groß",
              "it": "Grande",
              "en": "Large",
              "ja": "大",
              "fr": "Grand"
            }
          }
        ]
      }
    ]
  }
{% endschema %}