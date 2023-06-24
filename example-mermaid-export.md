# Example Mermaid Export

The export from the tool can be embedded in Markdown and rendered in Github

```mermaid
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart LR
landing-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/f6828953-5278-42e2-a4e8-1418d4f42dc2' width='37px' height='81px' alt='Landing page' />\nLanding page)
chocolate-listing-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/7dae614e-d0c1-4b21-b88e-a134acd16392' width='37px' height='81px' alt='Chocolate listing page' />\nChocolate listing page)
chocolate-detail-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/f960c46f-89f7-4455-936e-89f93d7bf2b2' width='37px' height='81px' alt='Chocolate detail page' />\nChocolate detail page)
basket-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/dd12b9ef-c608-4ffa-9760-072937726362' width='37px' height='81px' alt='Basket page' />\nBasket page)
login-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/e0a7abd5-5eb1-4597-b1ec-57b525f75b41' width='37px' height='81px' alt='Login page' />\nLogin page)
payment-details-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/a15e8167-44c4-4531-89f2-b1cb64263d6e' width='37px' height='81px' alt='Payment details page' />\nPayment details page)
confirm-order-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/cdd08a89-da6c-48e8-9fb4-a14f40678fd0' width='37px' height='81px' alt='Confirm order page' />\nConfirm order page)
order-confirmation-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/db8cd959-9aee-440d-bf87-f8179b6936a4' width='37px' height='81px' alt='Order confirmation page' />\nOrder confirmation page)
flower-listing-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/9c339aed-b3cb-4213-81e4-2aa71d49ae42' width='37px' height='81px' alt='Flower listing page' />\nFlower listing page)
flower-detail-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/06d56113-5620-46ac-9f92-b1cd90715484' width='37px' height='81px' alt='Flower detail page' />\nFlower detail page)
post-select-chocolate-subscription-frequency(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/4f423b17-47ae-4ac7-b568-0d208dda9b46' width='37px' height='81px' alt='Select chocolate subscription frequency' />\nSelect chocolate subscription frequency)
account-details-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/ddda59b5-d2c6-43fc-bb01-95f99b45b4e6' width='37px' height='81px' alt='Account details page' />\nAccount details page)
address-details-page(<img src='https://github.com/colinfwren/easy-user-journey-map/assets/182613/aba179a8-765f-467c-b3ca-e859d62f397a' width='37px' height='81px' alt='Address details page' />\nAddress details page)

landing-page --> |Select chocolates| chocolate-listing-page
chocolate-listing-page --> |Select chocolate to buy| chocolate-detail-page
chocolate-detail-page --> |Add chocolate to basket| basket-page
basket-page --> |Proceed to checkout| login-page
login-page --> |Log into account| payment-details-page
payment-details-page --> |Submit payment details| confirm-order-page
confirm-order-page --> |Confirm order| order-confirmation-page
landing-page --> |Select flowers| flower-listing-page
flower-listing-page --> |Select flower package to buy| flower-detail-page
flower-detail-page --> |Add flower package to basket| basket-page
chocolate-detail-page --> |Select chocolate subscription frequency| post-select-chocolate-subscription-frequency
post-select-chocolate-subscription-frequency --> |Add chocolate subscription to basket| basket-page
login-page --> |Register account| account-details-page
account-details-page --> |Submit personal details| address-details-page
address-details-page --> |Submit address details| payment-details-page
```
