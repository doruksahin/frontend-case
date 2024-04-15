## Belirtmek istediğim noktalar
Çalıştırmak için `yarn start` komutunu kullanabilirsiniz.
`Multiselect` component'ının Rick And Morty API ile kullanım örneği `MultiselectDemo.tsx` içerisinde yer alıyor.

- Infinite scroll default true olacak şekilde flag olarak eklendi.
- Mantine'deki multiselect'i incelediğimde sığmadığında aşağı doğru eklediğini gördüm, UI shift'in genel anlamda
istenmeyen bir davranış olduğunu düşünmeme rağmen yine de Mantine'daki gibi yaptım. Belki yatayda scroll olabilirdi.
- `renderDropdownItems` ile dışarıdan render pattern ile component definition verilebiliyor. 
Id ve description ortak olduğu için buraya default bir component koyma taraftarıydım fakat typelarda olabildiğince
ayrıma gitmeyip (discriminated union) varolan özellikleri tamamlamaya odaklanmaya çalıştım.
- navigasyon & tab tuşlarıyla focus değiştirme var ve component içerisinde focus lock olması için `useFocusHandler` 
hook'unu kullandım.
- Test için `vitest` kullandım.

## Case:
Adcreative.ai frontend developer pozisyonu icin hazirladigimiz bu case'de sizden React.js kullanarak multi-select autocomplete component implement etmenizi istiyoruz.
Daha sonra bu componenti "Rick and Morty" api'daki karakterleri aramak ve select etmek icin kullanacaksiniz.

Api linki: https://rickandmortyapi.com/documentation/#introduction

## Verilen assetler:
* Ornek tasarım assets/multi-select.png.

## Gereksinimler:
* React vs Typescript
* Tasarima uygun multi-select implementasyonu
* input alanina yazilan query ile api sorgulanip popup content'de listelenmesi
* Listelenen sonuclarda her bir karater icin karater resmi, ismi ve kac bolumde oynadigi bilgisinin gosterilmesi
* query icin yazilan sozcugun listelenen sonuclarda vurgulanmasi (ornek tasarimda 'ric' aramasi sonuclarinda 'Ric' bold seklinde gosterilmistir)
* secilen sonuclarin input alanina eklenmesi ve cikarilmasi
* Keyboard navigation desteklenmeli. Yon tuslari ve tab kullanarak tum islemler yapilabilmeli, input alanindaki secili ogeler veya sonuc listesindeki satirlar gezinebilmeli ve silme/secme islemleri yapilabilmeli.
* Loading state gosterimi
* Exception handling ve error statelerinin arayuzde gosterilmesi
* Ve tabi ki yazdiginiz kodun mimarisi, temiz ve okunakli olmasi belki de en onemli kriter olacaktir.

## Olsa iyi olur
* Deploy edilmis calisan hali ve linki (i.e vercel)
